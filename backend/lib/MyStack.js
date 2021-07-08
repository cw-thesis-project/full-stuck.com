import * as sst from "@serverless-stack/resources";
import * as apigAuthorizers from "@aws-cdk/aws-apigatewayv2-authorizers";

export default class MyStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      cors: true,
      defaultAuthorizer: new apigAuthorizers.HttpJwtAuthorizer({
        jwtAudience: [process.env.AUTH0_AUDIENCE],
        jwtIssuer: process.env.AUTH0_DOMAIN,
      }),
      defaultAuthorizationType: sst.ApiAuthorizationType.JWT,
      defaultFunctionProps: {environment: {MONGODB_URI: process.env.MONGODB_URI}, budle:false},
      routes: {
        "GET /user": "src/getUser.handler",
        "POST /user": "src/postUser.handler"
      },
    });
    // Show the endpoint in the output
    this.addOutputs({
      ApiEndpoint: api.url,
    });
  }
}