import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/Auth.Context";
import {Link} from "react-router-dom";

export const Constructor = () =>{
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()

    return(
        <>
            <div className="col-10 row canva_cards" style={{height: "inherit"}}>
                <div className="col-3 px-0">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Информация о дашборде</h5>
                            <p className="card-text">Информация о дашборде, назначение, тип, ограничения </p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Цели и задачи</h5>
                            <p className="card-text">Примеры понравившегося, бизнес цели и стартовые задачи</p>
                        </div>
                    </div>

                    <Link to="/constructor/asis" style={{ textDecoration: 'none' }}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Процессы “AS IS” </h5>
                                <p className="card-text">Схема технических или бизнес процессов компании требующих внимания и вмешательства</p>
                            </div>
                        </div>
                    </Link>

                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Макеты “AS IS” </h5>
                            <p className="card-text">Существующие решения Изображения Текущие даборды</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Боли существующих решений</h5>
                            <p className="card-text">Задачи для решения в ходе разработки</p>
                        </div>
                    </div>
                </div>
                <div className="col-3 px-0">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Ключевые вопросы</h5>
                            <p className="card-text">Примеры того что нравится, бизнес цели и стартовые задачи</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Процессы “TO BE” </h5>
                            <p className="card-text">Реорганизованные технические или бизнес процессы компании</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Макеты “TO BE” </h5>
                            <p className="card-text">Создание визуального макета Загрузка логотипа Выбор палитры</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Решения бизнес задач</h5>
                            <p className="card-text">Технические решения бизнес задачи</p>
                        </div>
                    </div>
                </div>
                <div className="col-3 px-0">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Пользователи</h5>
                            <p className="card-text">Перечень будущих пользователей дашборда </p>
                        </div>
                    </div>

                    <Link to="/constructor/source" style={{ textDecoration: 'none' }}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Источники</h5>
                                <p className="card-text">Перечень связки источников данных </p>
                            </div>
                        </div>
                    </Link>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Функцианальные требования</h5>
                            <p className="card-text">Перечень требований к разработанному решению</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Комментарии</h5>
                            <p className="card-text">Комментарии, пояснения, требующие внимания моменты</p>
                        </div>
                    </div>
                </div>
                <div className="col-3 px-0">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Показатели</h5>
                            <p className="card-text">Информация о показателях и набор данных </p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Графики</h5>
                            <p className="card-text">Выбор графиков и из количества  для отображения данных</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Таблицы</h5>
                            <p className="card-text">Выбор количества таблиц, форматирования</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Фильтры</h5>
                            <p className="card-text">Указания набора фильтров и срезов</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Формат отчетности</h5>
                            <p className="card-text">Выбор формата отчетности для дашборда</p>
                        </div>
                    </div>
                </div>

            </div>

        </>

    )
}
