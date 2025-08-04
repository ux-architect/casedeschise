// index.ts

import generalInfo from "./general-info";
import duoImage from './objects/duo-image';

import metadata from './objects/project-fields-metadata';
import tourMetadata from './objects/tour-fields-metadata'

import projectsSibiu from "./projects-sibiu";
import projectsValcea from "./projects-valcea";

import toursSibiu from "./tours-sibiu";
import toursValcea from "./tours-valcea";

import eventSibiu from "./event-sibiu";
import eventValcea from "./event-valcea";


export const schemaTypes = [generalInfo, duoImage, 
                                metadata,tourMetadata,
                                projectsSibiu, projectsValcea, 
                                toursSibiu, toursValcea,
                                eventSibiu, eventValcea, 
                            ]


//  util functions to getSchemaTitle for sanity.config.deskStructure.ts
const schemaMap = Object.fromEntries(
  schemaTypes
    .filter((schema) => !!schema.name) // make sure it’s a document/schema, not just an object
    .map((schema) => [schema.name, schema])
)

export function getSchemaTitle(type: string): string {
  return schemaMap[type]?.title || type
}