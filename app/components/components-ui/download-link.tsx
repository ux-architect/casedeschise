"use client"

import React from "react";

type DownloadLinkProps = {
  url: string;
  filename?: string;
  children?: React.ReactNode;
  className?: string;
};

export default function DownloadLink({ url, filename, children, className, ...rest }: DownloadLinkProps) {
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename || "download";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  };

  return <a className={className} href={url} onClick={handleClick} {...rest}>{children}</a>;
}