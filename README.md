# Nx Example (Author: @BenRacicot)

## Integrate with editors

Enhance your Nx experience by installing [Nx Console](https://nx.dev/nx-console) for your favorite editor. Nx Console
provides an interactive UI to view your projects, run tasks, generate code, and more! Available for VSCode, IntelliJ and
comes with a LSP for Vim users.

## Instructions
 - Install CLIs. 
 - `npm install -g @nestjs/cli` [NestJS](https://docs.nestjs.com/cli/overview) 
 - `npm install -g @angular/cli` [Angular](https://angular.io/cli)
 - `npm add --global nx@latest` [Nx](https://nx.dev/getting-started/intro) 
 - Install docker: https://www.docker.com/products/docker-desktop/
 - `docker compose up -d` # `docker compose down` to remove instance/db
 - seed postgress db: `./tools/scripts/typeorm-migration.sh master`

## Start the application

Run `nx serve server` to start the development server. 
Run `nx serve client` to start the development client. 

## Build for production

Run `nx build example` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Running tasks

To execute tasks with Nx use the following syntax:

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)
