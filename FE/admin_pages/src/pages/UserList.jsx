import styled from "styled-components"
import Paging from "../components/common/pagination";
import Loading from "../components/common/Loading";
import { React, useState, useEffect, useContext } from 'react';

import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Title from "../components/common/Title";
import UserTable from "../components/common/tables/userTable";
import { AuthContext } from "../components/common/login/AuthProvider";

const StyledPage = styled.div`
    padding-top: 1.5em;

    .contents {
      padding-top: 9em;
      margin-left: 17em;
    }

    .infotable {
      margin-top: 2em;
    }
    `;

const UserList = () => {
    const { accessToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const location = useLocation();
    const fullLocation = `${location.pathname}${location.search}${location.hash}`;


    const [userTableLoading, setUserTableLoading] = useState(true);
    const [userApproveInfo, setUserApproveInfo] = useState([]);



    const getUserApproveInfo = async () => {
        try {
            const response = await fetch(`http://43.202.196.181:8080/api/admin/users?page=1`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            setUserApproveInfo(json);
        } catch (error) {
            console.error('Fetching books failed:', error);
            if (!accessToken) {
                alert('로그인이 필요합니다.');
                navigate('/admin/login');
            }
        } finally {
            setUserTableLoading(false);
        }
    };

    useEffect(() => {
        getUserApproveInfo();
    }, [accessToken]);


    // useEffect(() => {
    //     getBook()
    // }, [fullLocation]);

    return (
        <StyledPage>
            <div className="contents">

                <Title title='회원관리' sub='회원의 목록을 확인하고 관리할 수 있습니다.'></Title>
                <div className="infotable">
                    {userTableLoading ?
                        <Loading /> :
                        <UserTable response={userApproveInfo} />}
                </div>

                {userTableLoading ?
                    <Loading /> :

                    <Paging response={userApproveInfo} />}

            </div>



        </StyledPage>

    );
}

export default UserList;