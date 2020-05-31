import { Types, PluginFunction } from '@graphql-codegen/plugin-helpers';
import {visit, GraphQLSchema, concatAST, Kind, FragmentDefinitionNode, OperationDefinitionNode, DocumentNode} from 'graphql';
import { LoadedFragment } from '@graphql-codegen/visitor-plugin-common';
import { UrqlAngularVisitor } from './visitor';
import { UrqlAngularRawPluginConfig } from './config';

export const plugin: PluginFunction<UrqlAngularRawPluginConfig> = (
  schema: GraphQLSchema,
  documents: Types.DocumentFile[],
  config
) => {
  const allAst = concatAST(documents.map(v => v.document).filter((d): d is DocumentNode => d !== undefined));
  const operations = allAst.definitions.filter(d => d.kind === Kind.OPERATION_DEFINITION) as OperationDefinitionNode[];
  const allFragments: LoadedFragment[] = [
    ...(allAst.definitions.filter(d => d.kind === Kind.FRAGMENT_DEFINITION) as FragmentDefinitionNode[]).map(
      fragmentDef => ({
        node: fragmentDef,
        name: fragmentDef.name.value,
        onType: fragmentDef.typeCondition.name.value,
        isExternal: false,
      })
    ),
    ...(config.externalFragments || []),
  ];

  const visitor = new UrqlAngularVisitor(schema, allFragments, operations, config, documents);
  const visitorResult = visit(allAst, { leave: visitor });

  return {
    prepend: visitor.getImports(),
    content: [
      visitor.fragments,
      ...visitorResult.definitions.filter((t: any) => typeof t === 'string')
    ]
      .filter(a => a)
      .join('\n'),
  };
};

export { UrqlAngularVisitor };
