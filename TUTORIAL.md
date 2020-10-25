# Building a basic react table library for npm
### Overview
In this tutorial we will be creating a basic react library, using **create-react-library** package. Our library will be represented as a table with sort and filter functionalities. We will then populate the table with data from Json Placeholder (free mock data source for developers) for testing purposes. The key concepts we will explore are:
- Initialization of a react library
- Typescript types and interfaces
- Creation and import of styles
- Creation and import of multiple components
- Deployment of a library to npm

##### The result can be found on this [Demo](https://elchuzade.github.io)
##### or installed on this [GitHub](https://github.com/elchuzade/react-table-devc/tree/master)

The image below shows how the table will look when imported from npm and populated with data.
![Library Image](https://elasticbeanstalk-eu-central-1-931642419815.s3.eu-central-1.amazonaws.com/DevC+(do+not+delete)/devc-table.png)

The table you see above includes a title, search input that filters data, sort buttons that sort data, column titles and rows of data.
### Requirements:
##### Knowledge:
- ***ReactJS*** with concept of ***Hooks***
- ***TypeScript***
- ***ES6***

##### Software
- Any ***IDE***, for this tutorial we will be using ***VSCode***
- ***npm*** or ***yarn***, for this tutorial we will be using ***npm***
- ***create-react-app***
- ***git***

### Let's get started!
Before jumping into coding we shave to complete all the setups.
- Setting up **NPM** account. In order to be able to publish your library to npm, you first need to create an account. You can do that from [npm's website](https://www.npmjs.com/). If you already have one, just login.
- Creating a **GitHub** account. In case if you don't have one, go to [GitHub](https://github.com/) and signup.
- Coming up with a unique name for your library. To check if the name already exists type it into the search bar on [npm's website](https://www.npmjs.com/). In this tutorial we will name our library **react-table-devc**
- Installing **create-react-library** package creator. This is the tool that does all the setups for you. ```npm install -g create-react-library```
- Creating a GitHub repository with the library name. Instructions can be found [here.](https://docs.github.com/en/enterprise/2.15/user/articles/create-a-repo). Make sure the repository is **public**.
- Creating a template for the library. Run in terminal ```npx create-react-library```
You will be prompted to fill out the following information. Make sure to select **MIT** in the *License* field and **typescript** in the *Template* field.

![Create React Library Init](https://elasticbeanstalk-eu-central-1-931642419815.s3.eu-central-1.amazonaws.com/DevC+(do+not+delete)/create-react-library-init.png)

Congratulations! You have finished the boring part of the development. It is time to explore the environment created by **create-react-library** and start coding our own stuff.

When you open the folder created by **create-react-library** in **VSCode** you will see the followeing folders structure:
```
your-library-name
└─── dist
└─── example
└─── node_modules
└─── src
```

- ***dist*** folder represents the compiled version of your library
- ***example*** folder holds the react app in which you will be importing the library and using like other software developers would, when it is published. (Sort is like a testing playground)
- ***node_modules*** folder is similar to any react app, this holds all the libraries and modules used by your project
- ***src*** folder is where you will do all the development of your library

![Create React App Window](https://elasticbeanstalk-eu-central-1-931642419815.s3.eu-central-1.amazonaws.com/DevC+(do+not+delete)/create-react-library-window.png)

#### Time to code
1. Open a terminal in the library's root folder and start the server.
This will recompile ***src*** folder into ***dist*** and whenever you change code in your library it will recompile again and refresh the browser.
    ```
    npm start
    ```

2. Open another terminal in the ***example*** folder and start the server.
This will watch the ***example*** folder for changes and update the browser whenever changes are made there.
    ```
    cd example // If you have opened a terminal in the library's root folder
    npm start
    ```

> All the files and all the code that the library contains will be added to the **src** folder in the **root** of the library.
The use case of the library will be added to the **src** folder inside the **example** folder.

> By now your browser should be opened with **localhost:3000** with the welcome text from **create-react-library** developers.

#### Step 1.
Create a ***types.d.ts*** file. This file will be holding global interfaces and types. Add the following interfaces and types into this file.

```
interface TableProps {
  id?: string;
  style?: {};
  className?: string; 
  title?: TableTitle;
  columns: TableColumn[];
  rows: object[];
  search?: TableInput;
  striped?: boolean;
  bordered?: boolean
}

interface TableColumnTitle {
  id?: string;
  style?: {};
  className?: string;
  title?: string;
  onSortAsc?: OnSortButton;
  onSortDes?: OnSortButton;
}

type TableTitle = {
  id?: string;
  style?: {}
  className?: string;
  value?: string;
}

type TableColumn = {
  id?: string;
  style?: {};
  className?: string;
  title?: string;
  columnKey: string; // unique
  onSortAsc?: OnSortButton;
  onSortDes?: OnSortButton;
  value: ColumnValue;
}

type TableInput = {
  id?: string;
  style?: {};
  className?: string;
  placeholder?: string;
  name?: string;
  type?: string;
  value?: any;
  searchFields?: string[];
  onChangeSearch?: OnChangeInput;
}

type SortData = (
  column: TableColumn,
  rows: object[],
  sortDirection: number
) => void

type FilterData = (
  searchFields: string[],
  rows: object[],
  searchTerm: string
) => void

type OnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => any

type OnSortButton = () => any

type ColumnValue = (row: object) => string
```

> **Note:** Some fields are **required** and some are **optional**.

- ***columns*** and ***rows*** are required fields in the **TableProps**, since there can be no table without these fields.
- ***columnKey*** is required field in the **TableColumn** and it must be unique. This one will be used by **sort** and **filter** functions, since we need to refer to the specific column by its unique key.

#### Step 2.
Change styles in the ***styles.module.css*** file with the code below. Here are some basic styles to make your table look more exciting.

```
table {
  table-layout: auto;
  border-collapse: collapse;
  width: 100%;
}

tr:nth-child(even) {
  background-color: lightgrey;
}

.table {
  padding: 1rem;
}

.table-header {
  position: relative;
  margin: 1rem;
  display: flex;
  align-items: center;
}

.table-header-left {
  margin-left: 1rem;
  margin-right: auto;
}

.table-header-right {
  margin-left: auto;
  margin-right: 1rem;
}

.table-header-title {
  margin: 0;
  color: darkblue;
  font-weight: 400;
  font-size: 1.5rem;
}

.table-header-input {
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  outline: none;
  border: 1px solid transparent;
  box-shadow: 0 0 3px black;
}

.table-header-input:hover {
  box-shadow: 0 0 4px black;
}

.table-body {
  margin: 0.5rem;
}

.table-column {
  border: 1px solid lightgrey;
  height: 2.5rem;
}

.table-column-title-left {
  float: left;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  height: 2rem;
}

.table-column-title-right {
  float: right;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  height: 2rem;
}

.table-column-title-button {
  background: white;
  border: none;
  border-radius: 0.5rem;
  margin-left: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  box-shadow: 0 0 3px black;
}

.table-column-title-button:hover {
  cursor: pointer;
  box-shadow: 0 0 4px black;
}

.table-column-title-button:focus {
  cursor: pointer;
  outline: none;
}

.table-column-title-button:active {
  cursor: pointer;
  box-shadow: 0 0 2px black;
}

.table-item {
  padding: 0.5rem;
}
```

> **Note:** Classes are written in a **SASS** style, this is done on purpose in case you want to make a bigger library and use **SASS** compiler. In that case you would have to install **node-sass** compiler and add it into the dependencies.

#### Step 3.
Add a new file ***TableColumnTitle.tsx*** to the ***src*** folder. This is a column title component, separated from the table to make the overall code cleaner and easier to read.

```
import React from 'react'
import styles from './styles.module.css'

const TableColumnTitle = ({
  id,
  className,
  style,
  title,
  onSortAsc,
  onSortDes
} : TableColumnTitle) => {
  return (
    <th
      id={id}
      className={`${styles['table-column']} ${className}`} style={style}
    >
      <span className={styles['table-column-title-left']}>
        {title}
      </span>
      <span className={styles['table-column-title-right']}>
        {onSortAsc &&
          <button
            className={styles['table-column-title-button']}
            onClick={onSortAsc}
          >
              {'<'}
          </button>
        }
        {onSortDes &&
          <button
            className={styles['table-column-title-button']}
            onClick={onSortDes}
          >
            {'>'}
          </button>
        }
      </span>
    </th>
  )
}

export default TableColumnTitle
```

> **Note:** Left and Right arrows can be replaced by your favorite icons that represent **Ascending** and **Descending** sorting functions.

#### Step 4.
Replace the code inside ***index.tsx*** file with the code below.
- Here we will import and use previously created ***TableColumnTitle*** component.
- We will write our own **sortData** and **filterData** functions.
- **Sort** functions will sort data inside the column in **ascending** or **descending** order.
- **Filter** function will filter all data rows based on **searchFields** array provided by the user of the library.
- We will hold a copy of rows in the table's local state to be able to sort and filter without affecting the actual data.
- Also functions such as **onSortAsc**, **onSortDes** and **onChangeSearch** can be provided by the library user. These will be executed after **sortData** and **filterData** to make sure that the **sort** and **filter** works as intended and the user gets his functions run as well.

```
import React, { useState } from 'react'
import TableColumnTitle from './TableColumnTitle'
import styles from './styles.module.css'

const DeveloperCirclesTable = ({
  id,
  style,
  className,
  title,
  columns,
  rows,
  search,
  striped,
  bordered
}: TableProps) => {
  const [tableRows, setTableRows] = useState(rows)

  const sortData: SortData = (column, rows, sortDirection) => {
    setTableRows([...rows.sort((a, b) =>
      column.value(a) > column.value(b) ? sortDirection : -sortDirection)])
  }

  const filterData: FilterData = (searchFields, rows, searchTerm) => {
    var filteredData: object[] = []
    searchFields.forEach(field => {
      var column = columns.find(col => col.columnKey === field)
      var filteredDataField = rows.filter(row => column && column.value(row).toLowerCase().includes(searchTerm.toLowerCase()))

      filteredData = filteredData.concat(filteredDataField.filter(item => filteredData.indexOf(item) < 0))
      setTableRows(filteredData)
    })
  }

  return (
    <div
      id={id}
      className={`${styles.table} ${className || ''}`}
      style={style}
    >
      <div className={styles['table-header']}>
        <div className={styles['table-header-left']}>
          {title && <p className={`${styles['table-header-title']} ${title.className || ''}`} style={title.style}>{title.value}</p>}
        </div>
        <div className={styles['table-header-right']}>
          {search && (
            <input
              id={search.id}
              className={`${styles['table-header-input']} ${search.className || ''}`}
              style={search.style}
              type={search.type || 'text'}
              placeholder={search.placeholder || 'search'}
              name={search.name}
              value={search.value}
              onChange={e => {
                search.searchFields && filterData(search.searchFields, rows, e.target.value)
                search.onChangeSearch && search.onChangeSearch(e)
                return
              }}
            />
          )}
        </div>
      </div>
      <div className={styles['table-body']}>
        <table>
          <thead>
            <tr>
              {columns.map(column => (
                <TableColumnTitle
                  id={column.id}
                  key={column.columnKey}
                  style={column.style}
                  className={column.className}
                  title={column.title}
                  onSortAsc={column.onSortAsc ? () => {
                    sortData(column, rows, 1)
                    return column.onSortAsc
                  } : undefined}
                  onSortDes={column.onSortDes ? () => {
                     sortData(column, rows, -1)
                    return column.onSortDes
                  } : undefined}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, index) => (
              <tr key={index}>
                {columns.map((column, i) => (
                  <td
                    key={i}
                    className={styles['table-item']}
                    style={{
                      background: striped ? 'none' : 'white',
                      border: bordered ? '1px solid lightgrey' : 'none',
                      ...column.style
                    }}
                  >
                    {typeof column.value(row) === 'string' ? column.value(row) : `Unsupported format, please check "value" field of ${column.columnKey} column`}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DeveloperCirclesTable
```

> **Note:** Here we are expecting table fields to be **strings**, but we are not **throwing  exceptions**, since this library is for demonstration purposes. When you build a bigger one, it is always better to work your exceptions and errors in a clear to understand manner.

### Almost done!
At this point you have completed development of your very own library.
All that's left is to import it into ***example*** folder for testing in the browser and finally to deploy it to ***npm***.

> **Note:** If you have a browser opened with the port listeting to your app, you will see an error occuring on the page. This is absolutely fine and expected. This happens because we have updated the **DeveloperCirclesTable** file, which holds the library we are developing, but the **App.tsx** in **example** folder is still trying to import the default empty Component, so next we will be changing the **App.tsx** in **example** folder adding the proper imports of our library.

#### Testing.
To be able to test our table we will need some data. Thanks to JSON-Placeholder we can access bunch of data created for development purposes.

Open ***example/src*** folder and replace everything inside ***App.tsx*** with the following code.
```
import React, { useState } from 'react'

import DeveloperCirclesTable from 'react-table-devc'
import 'react-table-devc/dist/index.css'

const users = [...]

const App = () => {
  const [search, setSearch] = useState('')

  return <DeveloperCirclesTable 
    striped
    bordered
    title={{
      value: 'Facebook Developer Circles'
    }}
    search={{
      placeholder: 'Searching...!',
      name: 'search',
      value: search,
      searchFields: ['name', 'email'],
      onChangeSearch: (e: any) => setSearch(e.target.value)
    }}
    rows={users}
    columns={[
      {
        title: 'Full Name',
        value: (row: any) => row.name,
        columnKey: 'name',
        onSortAsc: () => {},
        onSortDes: () => {}
      },
      {
        title: 'Email Address',
        value: (row: any) => row.email,
        columnKey: 'email'
      },
      {
        title: 'Address',
        value: (row: any) => row.address.street,
        columnKey: 'address',
        onSortAsc: () => {},
        onSortDes: () => {}
      }
    ]}
  />
}

export default App
```
Make sure to replace these two lines of imports at the top.
```
import DeveloperCirclesTable from 'react-table-devc'
import 'react-table-devc/dist/index.css'
```
- ```DeveloperCirclesTable``` should be replaced with the name that you gave to the component in the ***index.tsx*** of root ***src*** folder where you have built the table.
- ```react-table-devc``` should be replaced with the name of your library

Open the [JSON Placeholder](https://jsonplaceholder.typicode.com/users) website. And copy all the data you see in the browser. This is the dummy data about users. Paste it into the ```const users = [...]``` array at the top of the file instead of the 3 dots array.  Save the changes and head to the browser. You should see the table populated with the dummy data about users. Make sure ***users*** becomes an ***array*** of objects, not ***array*** of ***array*** of objects.

> **Note:** Here we are **NOT** passing all the props to the **DeveloperCirclesTable** component, since most of them were optional. In the **value** field of objects inside **columns** array we are passing a function that finds and returns the desired value from each row. Incase we want to hide **Sort Buttons** from the column title, we simply do not pass **onSortDes** and **onSortAsc**.

##### Full code to this tutorial can be found on [GitHub]('https://github.com/elchuzade')
##### Working demo of the table can be found on this [Demo](https://elchuzade.github.io)

#### Last step! Publishing to NPM
This part is perhaps the easiest of all. You need to login to npm, publish your library and deploy it on GitHub. To do all of that, open another terminal in the ***root*** of your library then follow the commands below.
- To login to npm run: ```npm login```
You will be promted to type in your ***username*** and ***password*** for *npm* account and your ***email***.
- To publish the library run: ```npm publish```
- To deploy to GitHub add GitHub remote address and run deployment script:
```git remote add origin git@github.com:<github-username>/<repository-name>.git```
```npm run deploy```

# Congratulations! - You did it.

Your library should soon be available on the npm. You should receive an email about the package deployment status. Now if you create a new react app, you can easily import the component as we did in **example** folder **App.tsx** file.

### Further improvements
If you liked the idea of craeting a table library, you can
- add more functionality
- improve styles
- add responsive design
- add error handling
- write documentation
- imrove code standarts
- add tests
to the table you have just created.

### Now you are officially a part of open source community with your very own library.
#### Hope this inspires you to create even more and even better libraries and we, developers, use them in our projects.
