import React from 'react';

export default function Tags({ tags }: { tags?: string[] | null }) {
  return (
    <>
      {tags?.includes('bikeParking') && (
        <span className="common-label diff-sibiu-valcea diff-background mb-10 clear-both">
          <span className="png-icon png-icon-bike-parking-2"></span>
          <span className="ml-10">Parcare de biciclete</span>
        </span>
      )}

      {tags?.includes('noPhotos') && (
        <span className="common-label diff-sibiu-valcea diff-background mb-10 clear-both">
          <span className="png-icon png-icon-no-photos-2"></span>
          <span className="ml-10">Fotografiatul interzis</span>
        </span>
      )}

      {tags?.includes('accesible') && (
        <span className="common-label diff-sibiu-valcea diff-background mb-10 clear-both">
          <span className="png-icon png-icon-accesible"></span>
          <span className="ml-10">Accesibil</span>
        </span>
      )}

      {tags?.includes('forChildren') && (
        <span className="common-label diff-sibiu-valcea diff-background mb-10 clear-both">
          <span className="png-icon png-icon-for-children"></span>
          <span className="ml-10">Activitate pentru copii</span>
        </span>
      )}
    </>
  );
}
