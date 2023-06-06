# Seed

Run the seed to delete and create all database information such as users, stores and images.

1. You need to have the fill information ready in the Seed module data folder.
2. Make sure all the fields, match your entities.
3. Make a get request on integrate Swagger **(Seed)** or a rest client to the **apiUrl/seed** end-point.
4. The first user in the seed list has the admin role, so you can use his credentials to get write permissions. Even if the values contain uppercase letters, everything in the database is stored in lowercase. Remember this to log in.

> Create as many **users** and **stores** as you need by duplicating the objects that represent them.

Examples:

**Stores**

```TypeScript
interface SeedStore {
  title: string;
  address: string;
}

interface SeedStoresData {
  stores: SeedStore[];
}

export const seedStoresData: SeedStoresData = {
  stores: [
    {
      title: 'Title Store',
      address: 'Address',
    },
  ]
}
```

**Users**

```TypeScript
interface seedUser {
  name: string;
  lastname: string;
  email: string;
  password: string;
  roles?: string[];
}

interface SeedUsersData {
  users: seedUser[];
}

export const seedUsersData: SeedUsersData = {
  users: [
    {
      name: 'Name',
      lastname: 'Lastname',
      email: 'email@example.com',
      password: 'YourSecurePassword',
      roles: ['Admin', 'User'],
    },
  ]
}
```
