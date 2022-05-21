import React, {useState, useEffect} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css'

function DataList(){
    const [phoneNumberList, setPhoneNumberList] = useState([]);

    const columns = [
        {dataField: 'id', text: 'ID'},
        {dataField: 'countryName', text: 'COUNTRY NAME', sort: true, filter: textFilter()},
        {dataField: 'countryCode', text: 'COUNTRY CODE', sort: true, filter: textFilter()},
        {dataField: 'phoneNumber', text: 'PHONE NUMBER', sort: true, filter: textFilter()},
        {dataField: 'phoneStatus', text: 'STATUS', sort: true, filter: textFilter()}
    ]

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 5,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function(page, sizePerPage){
            console.log('page', page);
            console.log('sizePerPage', sizePerPage);
        },
        onSizePerPageChange: function(page, sizePerPage){
            console.log('page', page);
            console.log('sizePerPage', sizePerPage);
        }
    });

    const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;
    console.log("NUMBER MAX VALUE = "+MAX_SAFE_INTEGER)
    useEffect(() => {
      fetch("http://localhost:8081/customers?size=740991")
      .then(response => response.json())
      .then(result => setPhoneNumberList(result.content))
      .catch(error => console.log("My bad... "+error));
    }, [])
    return <div>{
        <BootstrapTable 
        bootstrap4 
        keyField="id" 
        columns={columns} 
        data={phoneNumberList} 
        pagination={pagination}
        filter={filterFactory()}
        />
       }
    </div>
}
export default DataList;
