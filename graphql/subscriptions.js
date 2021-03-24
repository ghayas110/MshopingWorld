/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      username
      email
      phone_number
      category
      parentId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      username
      email
      phone_number
      category
      parentId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      username
      email
      phone_number
      category
      parentId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
      id
      userId
      user {
        id
        username
        email
        phone_number
        category
        parentId
        createdAt
        updatedAt
      }
      title
      description
      price
      quantity
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
      id
      userId
      user {
        id
        username
        email
        phone_number
        category
        parentId
        createdAt
        updatedAt
      }
      title
      description
      price
      quantity
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
      id
      userId
      user {
        id
        username
        email
        phone_number
        category
        parentId
        createdAt
        updatedAt
      }
      title
      description
      price
      quantity
      createdAt
      updatedAt
    }
  }
`;
