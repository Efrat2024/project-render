import React, { useState,useEffect } from 'react';
import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { useGetVacationsQuery } from '../../../Store/Slices/vacationApiSlice';
import { useGetUserQuery } from '../../../Store/Slices/authApiSlice';
import 'primeicons/primeicons.css';
import { PrimeIcons } from 'primereact/api';
import useAuth from '../../../Store/app/useAuth';


const Shop = () => {
    const { data, isLoading, isError, error } = useGetVacationsQuery();
    const { data: dataUsers, isErrorUsers, errorUsers, isLoadingUsers, isSuccessUsers } = useGetUserQuery();
    useEffect(() => {
        if (isLoading) {
        console.log("isLoading",isLoading);
        }
      }, [ isLoading]);
      useEffect(() => {
        if (isError) {
        console.log("isError",isError);
        }
      }, [ isError]);
      useEffect(() => {
        if (isErrorUsers) {
        console.log("isErrorUsers",errorUsers);
        }
      }, [ isErrorUsers]);
      useEffect(() => {
        if (isLoadingUsers) {
        console.log("isLoadingUsers",isLoadingUsers);
        }
      }, [ isLoadingUsers]);
    const { _id: userId, firstname, lastname, email, roles } = useAuth()
    const ind = dataUsers?.findIndex((i) => i._id === userId);
    const listItem = (vacation, index) => {
        const pairs = data?.map(element => {
            return {
                id: element._id,
                name: element.name // Assuming the name field exists in your data
            };
        });
        const findNameById = (id2) => {
            pairs?.forEach(element => {
            });


            const pair = pairs?.find((e) => e.id === id2);
            return pair ? pair.name : "";
        };
        return (

            <div className="col-12" key={vacation._id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <i className={PrimeIcons.CHECK_CIRCLE} style={{ fontSize: '2.5rem' }}></i>
                    <i className="PrimeIcons.check-circle" style={{ fontSize: '2.5rem' }}></i>
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900" >הרכישה שלך: {findNameById(vacation.vacations)}</div>
                            <div className="text-xl font-bold">     :  תאריך הזמנה
                                <br></br>
                                {vacation.purchaseDate}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>

                                    <span className="font-semibold"> כמות {vacation.quantity}</span>

                                </span>
                            </div>

                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">


                        </div>
                    </div>
                </div>
            </div>
        );
    };



    const listTemplate = (vacations) => {
        return <div className="grid grid-nogutter">{vacations?.vacationPackage?.map((vacation, index) => listItem(vacation, index))}</div>;
    };



    if (!dataUsers) {
        return "isLoading..."
    }
    return (
        <div className="card">
            <DataView value={dataUsers[ind]} listTemplate={listTemplate} layout="grid" />
        </div>
    );

}

export default Shop;
