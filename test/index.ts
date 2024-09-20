import {
  IHttpLlmApplication,
  IHttpLlmFunction,
  IHttpMigrateApplication,
  IHttpMigrateRoute,
  ILlmApplication,
  ILlmSchema,
  OpenApi,
} from "@samchon/openapi";
import { ILlmFunction } from "@samchon/openapi/lib/structures/ILlmFunction";
import {
  IHttpOpenAiApplication,
  IHttpOpenAiFunction,
  IOpenAiApplication,
  IOpenAiFunction,
  IOpenAiSchema,
  ISwagger,
  ISwaggerComponents,
  ISwaggerMigrateApplication,
  ISwaggerMigrateRoute,
  ISwaggerOperation,
  ISwaggerPath,
  ISwaggerSchema,
} from "@wrtnio/schema";
import typia from "typia";

const validate = <X, Y>(props: {
  createX: () => X;
  createY: () => Y;
  assertX: (input: unknown) => X;
  assertY: (input: unknown) => Y;
}): void =>
  new Array(1_000).fill(0).forEach(() => {
    const x = props.createX();
    const y = props.createY();
    props.assertX(x);
    props.assertX(y);
    props.assertY(x);
    props.assertY(y);
  });

// OPENAPI DOCUMENT
{
  let doc1: OpenApi.IDocument = null!;
  let doc2: ISwagger = doc1;
  doc1 = doc2;
  validate({
    createX: typia.createRandom<OpenApi.IDocument>(),
    createY: typia.createRandom<ISwagger>(),
    assertX: typia.createAssert<OpenApi.IDocument>(),
    assertY: typia.createAssert<ISwagger>(),
  });

  let comp1: OpenApi.IComponents = null!;
  let comp2: ISwaggerComponents = comp1;
  comp1 = comp2;
  validate({
    createX: typia.createRandom<OpenApi.IComponents>(),
    createY: typia.createRandom<ISwaggerComponents>(),
    assertX: typia.createAssert<OpenApi.IComponents>(),
    assertY: typia.createAssert<ISwaggerComponents>(),
  });

  let path1: OpenApi.IPath = null!;
  let path2: ISwaggerPath = path1;
  path1 = path2;
  validate({
    createX: typia.createRandom<OpenApi.IPath>(),
    createY: typia.createRandom<ISwaggerPath>(),
    assertX: typia.createAssert<OpenApi.IPath>(),
    assertY: typia.createAssert<ISwaggerPath>(),
  });

  let op1: OpenApi.IOperation = null!;
  let op2: ISwaggerOperation = op1;
  op1 = op2;
  validate({
    createX: typia.createRandom<OpenApi.IOperation>(),
    createY: typia.createRandom<ISwaggerOperation>(),
    assertX: typia.createAssert<OpenApi.IOperation>(),
    assertY: typia.createAssert<ISwaggerOperation>(),
  });

  let schema1: OpenApi.IJsonSchema = null!;
  let schema2: ISwaggerSchema = schema1;
  schema1 = schema2;
  validate({
    createX: typia.createRandom<OpenApi.IJsonSchema>(),
    createY: typia.createRandom<ISwaggerSchema>(),
    assertX: typia.createAssert<OpenApi.IJsonSchema>(),
    assertY: typia.createAssert<ISwaggerSchema>(),
  });
}

// MIGRATE APPLICATION
{
  let app1: IHttpMigrateApplication = null!;
  let app2: ISwaggerMigrateApplication = app1;
  app1 = app2;
  validate({
    createX: typia.createRandom<IHttpMigrateApplication>(),
    createY: typia.createRandom<ISwaggerMigrateApplication>(),
    assertX: typia.createAssert<IHttpMigrateApplication>(),
    assertY: typia.createAssert<ISwaggerMigrateApplication>(),
  });

  let route1: IHttpMigrateRoute = null!;
  let route2: ISwaggerMigrateRoute = route1;
  route1 = route2;
  validate({
    createX: typia.createRandom<IHttpMigrateRoute>(),
    createY: typia.createRandom<ISwaggerMigrateRoute>(),
    assertX: typia.createAssert<IHttpMigrateRoute>(),
    assertY: typia.createAssert<ISwaggerMigrateRoute>(),
  });
}

// LLM APPLICATION
{
  let httpApp1: IHttpLlmApplication = null!;
  let httpApp2: IHttpOpenAiApplication = httpApp1;
  httpApp1 = httpApp2;
  validate({
    createX: typia.createRandom<IHttpLlmApplication>(),
    createY: typia.createRandom<IHttpOpenAiApplication>(),
    assertX: typia.createAssert<IHttpLlmApplication>(),
    assertY: typia.createAssert<IHttpOpenAiApplication>(),
  });

  let httpFunc1: IHttpLlmFunction = null!;
  let httpFunc2: IHttpOpenAiFunction = httpFunc1;
  httpFunc1 = httpFunc2;
  validate({
    createX: typia.createRandom<IHttpLlmFunction>(),
    createY: typia.createRandom<IHttpOpenAiFunction>(),
    assertX: typia.createAssert<IHttpLlmFunction>(),
    assertY: typia.createAssert<IHttpOpenAiFunction>(),
  });

  let app1: ILlmApplication = null!;
  let app2: IOpenAiApplication = app1;
  app1 = app2;
  validate({
    createX: typia.createRandom<ILlmApplication>(),
    createY: typia.createRandom<IOpenAiApplication>(),
    assertX: typia.createAssert<ILlmApplication>(),
    assertY: typia.createAssert<IOpenAiApplication>(),
  });

  let func1: ILlmFunction = null!;
  let func2: IOpenAiFunction = func1;
  func1 = func2;
  validate({
    createX: typia.createRandom<ILlmFunction>(),
    createY: typia.createRandom<IOpenAiFunction>(),
    assertX: typia.createAssert<ILlmFunction>(),
    assertY: typia.createAssert<IOpenAiFunction>(),
  });

  let sep1: IHttpLlmFunction.ISeparated = null!;
  let sep2: IHttpOpenAiFunction.ISeparated = sep1;
  sep1 = sep2;
  validate({
    createX: typia.createRandom<IHttpLlmFunction.ISeparated>(),
    createY: typia.createRandom<IHttpOpenAiFunction.ISeparated>(),
    assertX: typia.createAssert<IHttpLlmFunction.ISeparated>(),
    assertY: typia.createAssert<IHttpOpenAiFunction.ISeparated>(),
  });

  let schema1: ILlmSchema = null!;
  let schema2: IOpenAiSchema = schema1;
  schema1 = schema2;
  validate({
    createX: typia.createRandom<ILlmSchema>(),
    createY: typia.createRandom<IOpenAiSchema>(),
    assertX: typia.createAssert<ILlmSchema>(),
    assertY: typia.createAssert<IOpenAiSchema>(),
  });
}
