import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetVacationsQuery } from '../../../Store/Slices/vacationApiSlice';
import { OrderList } from 'primereact/orderlist';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import {  useAddVacationToMyshoppingCartMutation, useDeleteVacationToMyshoppingCartMutation,useAddTovacationPackageMutation } from '../../../Store/Slices/vacationApiSlice';
import { useGetUserQuery } from '../../../Store/Slices/authApiSlice';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../Store/app/useAuth';
const SideCart  = () => {
    const navigate = useNavigate();
    const { data, isLoading, isError, error } = useGetVacationsQuery();

    const { data: dataUsers, isErroru, erroru, isLoadingu, isSuccessu } = useGetUserQuery();
    const [addVacationToMyshoppingCart] = useAddVacationToMyshoppingCartMutation();
    const [deleteVacationToMyshoppingCart] = useDeleteVacationToMyshoppingCartMutation()
    const [addTovacationPackage] = useAddTovacationPackageMutation()
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const vacationId = params.get('vacationId');
    const vacation = data?.find(item => item._id === vacationId);
    const [visible, setVisible] = useState(true);
    const  { _id:userId,firstname,lastname, email,roles}=useAuth()
    const username=`${firstname} ${lastname}`
     const ind = dataUsers?.findIndex((i) => i._id === userId);
     const [visibleBuying, setVisibleBuying] = useState(false);

    const handleBuyVacation = (vacationId) => {
        const x = data?.find(i => i._id === vacationId);
        addVacationToMyshoppingCart({ userId, vacationId })
        setVisibleBuying(true);
    };
    const findImgByVacationId = (vacationId) => {
       
        const x = data?.find(i => i._id === vacationId);
       
         return x.images[0]
    };
    const findNameByVacationId = (vacationId) => {
       
        const x = data?.find(i => i._id === vacationId);
        
         return x.name
    };
    const findLocationByVacationId = (vacationId) => {
       
        const x = data?.find(i => i._id === vacationId);
        
         return x.location
    };
    const findPriceByVacationId = (vacationId) => {
        
        const x = data?.find(i => i._id === vacationId);
        
         return x.price
    };

    const responsiveOptions = [
        { breakpoint: '991px', numVisible: 4 },
        { breakpoint: '767px', numVisible: 3 },
        { breakpoint: '575px', numVisible: 1 }
    ];
    const footer = (
        <>
            <Button label="הוסף לסל" icon="pi pi-check" onClick={() => handleBuyVacation(vacation._id)}/>
            
            {/* <Button label="ב" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} /> */}
        </>
    );
    const handleIncreaseQuantity = (vacationId) => {
        addVacationToMyshoppingCart({ userId, vacationId })
        setVisibleBuying(true);
        // Handle increase quantity logic
    };

    const handleDecreaseQuantity = (vacationId) => {
        deleteVacationToMyshoppingCart({ userId, vacationId })

        if (!userId || !username) {
            setVisibleBuying(false);
            setVisible(true);
        } else {
            setVisibleBuying(true);
        }
        setVisibleBuying(true);
        // Handle decrease quantity logic
    };


    // const handleMoreInfo = (vacationId) => {
    //     navigate(`/info?vacationId=${vacationId}`);
    // };
    

    const func = () => {
        addTovacationPackage({ userId })
        navigate('/FinishBuying')
    }
    const pairs = data?.map(element => {
        return {
            id: element._id,
            name: element.name // Assuming the name field exists in your data
        };
    });

    const findNameById = (id2) => {
        const pair = pairs?.find((e) => e.id === id2);
        return pair ? pair.name : "";
    };
    
    const itemTemplate = (item) => {
        return (<>
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={"https://server2-efrat.onrender.com/uploads/"+findImgByVacationId(item.vacations).split("\\")[2]}   />
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{findNameByVacationId(item.vacations)}</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                        <span>{findLocationByVacationId(item.vacations)}</span>
                    </div>
                </div>
                <span className="font-bold text-900">${findPriceByVacationId(item.vacations)}</span>
            </div>
            <div className="flex justify-content-center align-items-center gap-2">
                                            <Button icon="pi pi-minus" className="p-button " onClick={() => handleDecreaseQuantity(item.vacations)} />
                                            
                                            <span className="font-bold">{item.quantity}</span>
                                            <Button icon="pi pi-plus" className="p-button " onClick={() => handleIncreaseQuantity(item.vacations)} />
                                        </div>
            </>
        );
    };
    

    const func2 = () => {
        if (!localStorage.getItem("userid")) {
            setVisible(true);
            return true;
        } else {
            setVisibleBuying(true);
            return false;
        }
    };
  
    if (!dataUsers) {
        return <div>Loading...</div>;
    }
    return (
        <>

                <div className="card xl:flex xl:justify-content-center">
                    
                <OrderList
  dataKey="id"
  value={dataUsers[ind].shoppingCart}
  itemTemplate={itemTemplate}
  header={`החופשות שבסל שלך ${username}`}
/>
        </div>
        <Button onClick={func} label="לסיום הרכישה" className="p-button-raised p-button-info mt-3" />
        </>
    );
};

export default SideCart ;

