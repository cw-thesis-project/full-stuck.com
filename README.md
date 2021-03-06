# Full-Stuck

<!-- badges -->

<p>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/Language-Typescript-3178C6.svg?logo=typescript"/>
  </a>
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/Powered%20by-React-5ED3F3.svg?logo=react"/>
  </a>
  <a href="https://redux.js.org/">
    <img src="https://img.shields.io/badge/State-Redux-7247B5.svg?logo=redux"/>
  </a>
  <a href="https://sass-lang.com/">
    <img src="https://img.shields.io/badge/Style-SCSS-CF649A.svg?logo=sass"/>
  </a>
  <a href="https://auth0.com/">
    <img src="https://img.shields.io/badge/Authentication-Auth0-EB5424.svg?logo=auth0"/>
  </a>
  <a href="https://www.mongodb.com/">
    <img src="https://img.shields.io/badge/Database-MongoDB-13AA52.svg?logo=mongodb"/>
  </a>
  <a href="https://aws.amazon.com/">
    <img src="https://img.shields.io/badge/Serverless-AWS-DA5041.svg"/>
  </a>
  <a href="https://full-stuck.com">
    <img src="https://img.shields.io/badge/Deployment-Live-green.svg?logo=github">
  </a>
</p>

Full Stack is a **game** where you are a software bootcamp student.

Your goal is to reach to **CEO** by completing all the previous levels.

<a href="https://full-stuck.com">
  <img width="100%" src="./docs-assets/screens-mocks.png">
</a>

Complete a level by learning 3 different **technologies** in any order you want.

Check your **schedule** for the next sprint to start playing!

Once you have master your developer skill, you will have to pass the **assessment** to prove your knowledge.

Be careful with bugs!

## Demo Video

This video was prepared by our team using [Adobe Premiere](https://www.adobe.com/products/premiere.html) for editing and [Audacity](https://www.audacityteam.org/) for the voice-overs.

<a href="https://www.youtube.com/watch?v=RHwkrV2tcAw">
  <img width="100%" src="./docs-assets/youtube-preview.png">
</a>

It is meant to appeal to both a technical audience and the stakeholders.

## About the project

**Full Stack** is being developed by the following people:

| Gil                                                                             | Ron                                                                             | David                                                                           | Pablo                                                                           | Viktor                                                                         |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| <img src="https://avatars.githubusercontent.com/u/78416008?&v=4" width="100px"> | <img src="https://avatars.githubusercontent.com/u/65477545?&v=4" width="100px"> | <img src="https://avatars.githubusercontent.com/u/35059811?&v=4" width="100px"> | <img src="https://avatars.githubusercontent.com/u/16283826?&v=4" width="100px"> | <img src="https://avatars.githubusercontent.com/u/39421290?v=4" width="100px"> |
| [GitHub](https://github.com/GILREICH1)                                          | [GitHub](https://github.com/CalimeRon)                                          | [GitHub](https://github.com/davidspanjaard)                                     | [GitHub](https://github.com/carbonellpablo)                                     | [GitHub](https://github.com/vikvikvr)                                          |
| [LinkedIn](https://www.linkedin.com/in/greich/)                                 | [LinkedIn](https://www.linkedin.com/in/ron-chamma/)                             | [LinkedIn](https://www.linkedin.com/in/david-spanjaard-757135210/)              | [LinkedIn](https://www.linkedin.com/in/carbonellpablo/)                         | [LinkedIn](https://www.linkedin.com/in/vikvikvr/)                              |

## Architecture

**Full Stack** is a full stack **serverless** application deployed on https://full-stuck.com

![logo](./docs-assets/architecture.png 'logo')

The frontend is hosted on Amazon S3 and we are using Amazon Cloudfront as CDN to improve performance.

The backend is implemented with Amazon Gateway, Amazon Lambda and Mongo Atlas.

This architecture has the following characteristics:

- auto-scalable
- maintaince-free
- cost-effective

## Development cycle

We have also implemented a very simple ???continuous delivery / continuous integration ??? process with Github Actions.

For example, a pull request to dev or main will automatically deploy the branch we are trying to merge.

Thanks to this, we improve our testing and reviewing procedures before every merge.

![logo](./docs-assets/cd-ci.png 'logo')

## Run the project

Check for the `readme.md` inside `client` and `backend` folders for the instructions on how to run this project.
