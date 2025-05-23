import React, {useEffect, useState} from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarText, NavbarToggler, Button } from 'reactstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import lLogoEmployees from '../images/employees.png';
import { auth } from "../PrivateRouteUtils/Auth";
import {PrivateNavItem, CommonNavItem}  from "../PrivateRouteUtils/PrivateNavItem";
import accessServerAPI from "../model/AccessServerAPI";
import PodborPersonala from '../images/img.png';
interface AppNavbarProps {
    [key: string]: any; // Allow any additional props
}
interface AppNavbarState {
    imageFile: File | null;
    imageUrl: string | null;
    //imageChanged: boolean;
}
const AppNavbar: React.FC<AppNavbarProps> = (args) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggle = () => setIsOpen(!isOpen);
    const location = useLocation();
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    console.log({ location });
    // let { from } = location.state || { from: { pathname: "/" } };

    const ClickLogout = () => {
        const rootPage = { pathname: "/" };
        auth.logout(() => {
            navigate(rootPage);
        });
    }

    const ClickLogin = () => {
        const rootPage = { pathname: "/" };
        auth.logout(() => {
            navigate("/login", {state: location.pathname});
        });
    }
    // Получите информацию о пользователе
    const userInfo = auth.getUserInfo();


    useEffect(() => {
        let isMounted = true; // Флаг для проверки, что компонент смонтирован
        if (userInfo.employeeId) {
            accessServerAPI.image.getById(userInfo.employeeId)
                .then(response => {
                    if (isMounted) {
                        const url = URL.createObjectURL(response);
                        setImageUrl(url);
                    }
                })
                .catch(error => {
                    console.error('Ошибка при загрузке изображения:', error);
                    if (isMounted) {
                        setImageUrl(PodborPersonala); // Используем изображение по умолчанию
                    }
                });
        } else {
          //  setImageUrl(PodborPersonala); // Используем изображение по умолчанию
        }

        return () => {
            isMounted = false; // Устанавливаем флаг, когда компонент размонтирован
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl); // Освобождаем объект URL
            }
        };
    }, [userInfo.employeeId]);

    return (
        <Navbar {...args} color="primary" dark expand="sm" container="fluid" className="sticky-top p-0">
            <NavbarBrand tag={Link} to="/" className="m-0 pt-1">
                <img src={lLogoEmployees} title="Сотрудники: Оптимальный выбор должностей сотрудников" />
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                    <CommonNavItem to="/" name="Главная" />
                    <PrivateNavItem to="/personal" name="Личный кабинет" />
                    <PrivateNavItem to="/users" name="Пользователи" />
                    <PrivateNavItem to="/employees" name="Сотрудники" />
                    <PrivateNavItem to="/employee_position" name="Професии" />
                    <PrivateNavItem to="/workplace" name="Должности" />
                    <PrivateNavItem to="/employee_position_feature" name="Характеристики" />
                    <PrivateNavItem to="/project" name="Проекты" />
                    <PrivateNavItem to="/recruitment" name="Набор" />
                    <PrivateNavItem to="/employee_workplace" name="Назначенные" />
                    <PrivateNavItem to="/analysis" name="Анализ" />
                </Nav>
                {
                    auth.isAuthenticated() ? (
                        <Nav>
                            <NavbarText className="d-flex align-items-center me-2 pt-0 pb-1" title={auth.getUserInfo().email} style={{display: 'flex'}}><div style={{ width: '30px', height: '30px', borderRadius: '50%', overflow: 'hidden', marginLeft: '10px' }}>
                                <img
                                    className="img-fluid"
                                    src={imageUrl || PodborPersonala} // Изображение по умолчанию
                                    alt="User"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Используем object-fit
                                />
                            </div><b>&nbsp;{auth.getUserInfo().username}</b>
                                </NavbarText>
                            <Button onClick={ClickLogout} color="light" outline size="sm" className="py-0">Выход</Button>
                        </Nav>
                    ) : (
                        <Button onClick={ClickLogin} outline color="light"  className="py-0">Вход</Button>
                    )
                }
            </Collapse>
        </Navbar>
    );
}

export default AppNavbar;

