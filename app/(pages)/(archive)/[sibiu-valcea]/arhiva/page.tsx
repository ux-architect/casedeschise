import { getArchiveProjects, getGeneralInfo } from "@/sanity/sanity.query";
import { ProjectType, SiteInfoType } from "@/types";
import './page.scss';
import Image from "next/image";
import Link from "next/link";
import PartnerSection from "@/app/components/components-server/partner-section";
import FooterSection from "@/app/components/components-server/footer-section";

export default async function Archive({ params}: {params: Promise<{ year:string, "sibiu-valcea": string }>;}) {
 const { ["sibiu-valcea"]: city }= await params;
 const url_logo = `/images/case-${city}-negru.png`;

  const [projects, generalInfo] = await Promise.all([
    getArchiveProjects("projects-" + city) as Promise<ProjectType[]>,
    getGeneralInfo(),
  ]);
  const projectsByYear: Record<string, ProjectType[]> = projects.reduce((acc, project) => {
    const year = project.metadata?.year || "Unknown";
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(project);
    return acc;
  }, {} as Record<string, ProjectType[]>);

  const allYears = Array.from({ length: new Date().getFullYear() - 2024 + 1 },(_, index) => String(2024 + index),).reverse();

  const sortBySection = (left: ProjectType, right: ProjectType) =>
    parseInt(left.metadata?.section ?? "0", 10) - parseInt(right.metadata?.section ?? "0", 10);
  
  return(
    <main className={`nsc--page-archive common-page-structure-style-2`} data-no-highlight-on-nav>

      <div className="cover">
        <div className="cover-image inner-shadow-top inner-shadow-top-size-50 inner-shadow-top-value-40">
          <Image src="/images/arhiva-image.jpg" className="object-cover" fill priority data-wait-for-image sizes="(max-width: 768px) 70vw, 100vw" alt="cover"/>
        </div>
        <div className="page-title font-safiro diff-sibiu-valcea">ARHIVĂ</div>
        <Link href="/" className={`logo-black hide-while-still-loading` }><Image src={`${url_logo}`} className="object-contain" fill priority unoptimized sizes="(max-width: 768px) 100vw, 33vw" alt="cover"/></Link>
      </div>
      

      <div className="layout-container clearfix">
              {allYears.map((year) => {
                const yearProjects = [...(projectsByYear[year] ?? [])].sort(sortBySection);

                if (yearProjects.length === 0) return null;

                const yearSectionNames = generalInfo?.sectionNames?.find((ct) => ct.year === year);
                const getSectionTitle = (section: string) => {
                  const key = `s${section}_${city}` as keyof typeof yearSectionNames;
                  return yearSectionNames?.[key] as string | undefined;
                };

                const sectionNums = Array.from(
                  new Set(yearProjects.map((p) => p.metadata?.section ?? "")),
                ).sort((a, b) => parseInt(a || "0", 10) - parseInt(b || "0", 10));

                return (
                  <section id={`year-${year}`} className="year-section" key={year}>
                    <h2 className="title font-safiro diff-sibiu-valcea">{year}</h2>

                    {sectionNums.map((section) => {
                      const sectionTitle = getSectionTitle(section);
                      const sectionProjects = yearProjects.filter(
                        (p) => (p.metadata?.section ?? "") === section,
                      );

                      return (
                        <div className="section-group" key={section}>
                          {sectionTitle && (
                            <h3 className="section-title diff-sibiu-valcea">{sectionTitle}</h3>
                          )}
                          <div className="projects-list">
                            {sectionProjects.map((project) => {
                              const parts = project.name.split('///').map((part) => part.trim());
                              const title = parts[0] || project.name.replace('///', ' ').trim();
                              const subtitle = parts[1] || "";
                              const imageSrc = project.profileImage?.image || "/should-not-happen.jpg";

                              return (
                                <Link className="project-item no-underline" href={`/${city}/${project.slug.current}`} key={project._id} scroll={true} rel="noreferrer noopener">
                                  <div className="project-image">
                                    <Image src={imageSrc} alt={`${title} cover image`} fill sizes="(max-width: 768px) 96px, 140px" className="object-cover" loading="lazy" />
                                  </div>
                                  <div className="project-copy hide-long-text">
                                    <h3 className="project-title no-underline hide-long-text w-100">{title}</h3>
                                    {subtitle && <span className="project-subtitle hide-long-text">{subtitle}</span>}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </section>
                );
              })}
      </div>

      <PartnerSection page={city} />
      <FooterSection city={city}/>
          
    </main>
    )

}