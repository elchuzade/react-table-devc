# react-table-devc

### Live [Demo](https://elchuzade.github.io)

### Check [TUTORIAL.md](https://github.com/elchuzade/react-table-devc/blob/master/TUTORIAL.md) for instructions on how to build and publish a table like this from scratch.

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-table-devc.svg)](https://www.npmjs.com/package/react-table-devc) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-table-devc
```

## Usage TypeScript and React Hooks

```tsx
import React, { useState } from 'react'

import DeveloperCirclesTable from 'react-table-devc'
import 'react-table-devc/dist/index.css'

const Example = () => {
  const [search, setSearch] = useState('')
  
  // This data is taken and modified from JSON Placeholder users database https://jsonplaceholder.typicode.com/users
  const users = [
    {
      "name": "Leanne Graham",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
      }
    },
    {
      "name": "Ervin Howell",
      "email": "Shanna@melissa.tv",
      "address": {
        "street": "Victor Plains",
      }
    },
    {
      "name": "Clementine Bauch",
      "email": "Nathan@yesenia.net",
      "address": {
        "street": "Douglas Extension",
      }
    }
  ]
  
  render() {
    return <DeveloperCirclesTable
      title={{value: 'Table Title'}}
      search={{
        name: 'search',
        value: search,
        onChangeSearch: (e: any) => setSearch(e.target.value),
        searchFields: ['name', 'email']
      }}
      rows={users}
      columns={[
        {
          title: 'Full Name',
          value: (row: any) => row.name,
          columnKey: 'name'
        },
        {
          title: 'Email',
          value: (row: any) => row.email,
          columnKey: 'email'
        },
        {
          title: 'Address',
          value: (row: any) => row.address.street,
          columnKey: 'address'
        }
      ]}
    />
  }
}

export const Example
```
## Props
**DeveloperCirclesTable**
| Name | Important | Type | Description |
| ------------- | ------------- | ------------- | ------------- |
| ***id***  | *optional* | *string* | id of the table |
| ***style***  | *optional* | *object* | key value pairs of react inline styles |
| ***className*** | *optional* | *string* | list of classes presented in a string format that will be applied to the table |
| ***striped*** | *optional* | *bool* | makes table rows striped (1, grey, 1 white) |
| ***bordered*** | *optional* | *bool* | adds border to the table and its rows and columns |
| ***title*** | *optional* | *object* | controls the table title in the table header. Props are shown below |
| ***search*** | *optional* | *object* | controls input field for the search bar in the table header. Props are shown below |
| ***rows*** | *optional* | *array of objects* | data that will be shown in the table. |
| ***columns*** | *optional* | *array of objects* | descriptions for each column of the table. Props are shown below. |
#

**Title**
| Name | Important | Type | Description |
| ------------- | ------------- | ------------- | ------------- |
| ***id*** | *optional* | *string* | id of the table title |
| ***style*** | *optional* | *object* | key value pairs of react inline styles |
| ***className*** | *optional* | *string* | list of classes presented in a string format that will be applied to the table title |
| ***value*** | *optional* | *string* | text that will be represented in the table title |
#

**Search**
| Name | Important | Type | Description |
| ------------- | ------------- | ------------- | ------------- |
| ***id*** | *optional* | *string* | id of the table |
| ***style*** | *optional* | *object* | key value pairs of react inline styles |
| ***className*** | *optional* | *string* | list of classes presented in a string format that will be applied to the table |
| ***placeholder*** | *optional* | *string* | placeholder text that will be shown in the input field |
| ***name*** | *optional* | *string* | name of the html input element |
| ***type*** | *optional* | *string* | type of input field in the search bar, by default text |
| ***value*** | *optional* | *string* | value of the html input element |
| ***searchFields*** | *optional* | *array of strings* | list of fields that will be searched when anything is typed in the search field, these must be unique keys for each column that will also be included in the column props |
| ***onChangeSearch*** | *optional* | *function* | an onChange function of the input field. It will do the filter plus whatever is added to this prop |
#

**Column**
| Name | Important | Type | Description |
| ------------- | ------------- | ------------- | ------------- |
| ***id*** | *optional* | *string* | id of the column title |
| ***style*** | *optional* | *object* | key value pairs of react inline styles |
| ***className*** | *optional* | *string* | list of classes presented in a string format that will be applied to the column title |
| ***title*** | *optional* | *string* | text that will be written in the column title |
| ***columnkey*** | *required* | *string* | unique key that will be used to address this column for filtering data. |
| ***value*** | *required* | *function* | function that takes as input a row and returns the value for the current column |
| ***onSortAsc*** | *optional* | *function* | function that adds Asc sort button to the table column title, with its functionality of sorting Asc |
| ***onSortDesc*** | *optional* | *function* | function that adds Des sort button to the table column title, with its functionality of sorting Des |


## License

MIT © [elchuzade](https://github.com/elchuzade)
