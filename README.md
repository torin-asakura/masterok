# masterok

### services

**proxy** - transfers positions fetched from russvet to moysklad

`@proxy/application` - starter module

`@proxy/russvet` - russvet API

`@proxy/moysklad` - moysklad API

`@proxy/collaboration` - works with russvet and moysklad API, provides higher-level methods for it

`@proxy/repository` - service that works with db (prisma ORM + postgres)

### scripts

**Before you start:**

1. `yarn workspace @proxy/repository migrate` - run all migrations on your database

2. `yarn workspace @proxy/repository generate` - regenerate prisma client according to new schema

**Docker:**

`docker-compose up proxy` - starts proxy service, also runs db
