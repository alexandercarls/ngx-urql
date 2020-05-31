import {ClientSideBasePluginConfig, ClientSideBaseVisitor, LoadedFragment} from '@graphql-codegen/visitor-plugin-common';
import {GraphQLSchema, OperationDefinitionNode} from 'graphql';
import {UrqlAngularRawPluginConfig} from './config';
import {Types} from '@graphql-codegen/plugin-helpers';

export interface UrqlAngularPluginConfig extends ClientSideBasePluginConfig {
  querySuffix?: string;
  mutationSuffix?: string;
  subscriptionSuffix?: string;
}

export class UrqlAngularVisitor extends ClientSideBaseVisitor<
  UrqlAngularRawPluginConfig,
  UrqlAngularPluginConfig
  > {
  constructor(
    schema: GraphQLSchema,
    fragments: LoadedFragment[],
    allOperations: OperationDefinitionNode[],
    rawConfig: UrqlAngularRawPluginConfig,
    documents?: Types.DocumentFile[]
  ) {
    super(
      schema,
      fragments,
      rawConfig,
      {
        querySuffix: rawConfig.querySuffix,
        mutationSuffix: rawConfig.mutationSuffix,
        subscriptionSuffix: rawConfig.subscriptionSuffix,
      },
      documents
    );
  }

  public getImports(): string[] {
    const baseImports = super.getImports();
    const hasOperations = this._collectedOperations.length > 0;

    if (!hasOperations) {
      return baseImports;
    }

    const imports = [
      `import { Injectable } from '@angular/core';`,
      `import { Query, Mutation, Subscription } from 'ngx-urql';`,
    ];

    // const usedOperations = this._collectedOperations.map((node) => node.operation);


    return [...baseImports, ...imports];
  }

  private _operationSuffix(operationType: string): string {
    const defaultSuffix = 'GQL';
    switch (operationType) {
      case 'Query':
        return this.config.querySuffix || defaultSuffix;
      case 'Mutation':
        return this.config.mutationSuffix || defaultSuffix;
      case 'Subscription':
        return this.config.subscriptionSuffix || defaultSuffix;
      default:
        return defaultSuffix;
    }
  }

  protected buildOperation(
    node: OperationDefinitionNode,
    documentVariableName: string,
    operationType: string,
    operationResultType: string,
    operationVariablesTypes: string
  ): string {
    const serviceName = `${this.convertName(node)}${this._operationSuffix(operationType)}`;

    return `
@Injectable({
  providedIn: 'root'
})
export class ${serviceName} extends ${operationType}<${operationResultType}, ${operationVariablesTypes}> {
  document = ${documentVariableName};
}`;
  }
}
