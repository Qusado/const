import React, {createElement, useContext, useState} from 'react'
import {FirstMainBlock} from "../components/FirstMainBlock";
import Flow_block from "../components/Flow_block";
import 'antd/dist/antd.css';
import jsplumb from 'jsplumb';
import html2canvas from "html2canvas";
const jsPlumbIn = jsplumb.jsPlumb;
import source2 from "../images/procc_block.png";
import source3 from "../images/comment-dots%201.png";


export const AsIsPage = () =>{

    var current_proc_block  = document.getElementById("proc_block");

    const [conn_data, setCon_data] = useState({
    })

    function dragStart(event) {
        event.dataTransfer.setData("type", "block");
        event.dataTransfer.setData("dragged_state", "first");
    }
    function dragStartRewrite(event) {
        event.dataTransfer.setData("type", "comm");
        event.dataTransfer.setData("dragged_state", "first");
    }
    function dragEnter(event) {
        event.preventDefault();
        if(!event.target.classList.contains("dropped")) {
            event.target.classList.add("droppable-hover");
        }
    }
    function dragOver(event) {
        event.preventDefault();
        if(!event.target.classList.contains("dropped")) {
            event.preventDefault();
        }
    }
    function dragLeave(event) {
        if(!event.target.classList.contains("dropped")) {
            event.target.classList.remove("droppable-hover");
        }
    }
    function getCoords(elem) {
        let box = elem.getBoundingClientRect();
        return {
            top: box.top + window.pageYOffset,
            left: box.left + window.pageXOffset
        };
    }

    const jsPlumbIn_common = {
        isSource: true, // Урок 2.8 Перетащите, чтобы создать узел, исходный узел
        isTarget: true, // Урок 2.8 Перетащите, чтобы создать узел, целевой узел
        // Урок 2.3 Существует четыре стиля подключения jsplumb, здесь я выбрал прямую линию.
        // Безье: кривая Безье
        // Блок-схема: блок-схема с поворотом на 90 градусов
        // StateMachine: конечный автомат
        // Прямо: прямо
        // Тип соединения Толщина линии Цвет линии, это кажется бесполезным, цвет линии, это может контролировать цвет
        connector: ['Straight',{lineWidth: 5,fill: '#1890FF',strokeStyle: '#1890FF'}],
        maxConnections: -1,   // Одна конечная точка перетаскивает несколько соединений, значение равно 1, конечная точка может иметь только одну строку, а перетаскивание конечной точки может отменить соединение; -1 конечная точка может иметь несколько подключений
        endpoint: ['Dot', {radius: 5, fill: '#1890FF'}],// Измените цвет конечной точки, измените исходный серый и черный на синий
        endpointStyle: { fill: '#1890FF'},  // Управляем цветом конечной точки, это кажется более надежным
        connectorStyle: {stroke: '#1890FF', strokeWidth: 2},// Устанавливаем цвет и толщину соединения
        connectorOverlays : [['Arrow', { width: 12, length: 12, location: -4 }]], // Устанавливаем положение, размер и цвет стрелки
        connectorHoverStyle : {lineWidth: 2,stroke: '#1A32FF', strokeStyle: '#1A32FF', outlineWidth: 10, outlineColor: ''},// Мышь наведена на стиль соединения
        paintStyle: {strokeStyle: '#1890FF', stroke: '#1890FF', fill: 'pink', fillStyle: '#1890FF', radius: 6, lineWidth: 2},
    }

    function intLineContainer(){
        jsPlumbIn.setContainer("lineContainer"); // Контейнер, все связанные элементы должны быть в контейнере.
        const leftTable = document.getElementById("flow_block");
        const rightTable = document.getElementById("flow_block");
        initPointId(leftTable,"source");
        initPointId(rightTable,"target");
        jsPlumbIn.bind('click', function (conn, originalEvent) {
            if (window.confirm('Вы действительно хотите удалить ссылку, по которой вы нажали? ')) {
                deleteConnectionData(conn);
                jsPlumbIn.deleteConnection(conn);
            }
        });
        jsPlumbIn.bind('connection', function (conn) {// Когда две таблицы связаны
            connection(conn);
        });
        jsPlumbIn.bind('connectionDetached', function (conn) {// Событие триггера при отключении
            // that.connectionDetached(conn);
        });

    }

    function deleteConnectionData(conn){
        console.log("Триггер удалить операцию обработки данных о деньгах");
        unBuildConnectionData(conn);
    }

    function connection(conn){
        // TODO: операция, которая должна быть выполнена для завершения подключения
        buildConnectionData(conn);
    }

    function buildConnectionData(conn){
        // TODO: операция, которую необходимо выполнить, когда соединение завершено, elementID - это информация об операции jsPlumbIn, которая используется для обработки данных при удалении соединения
        // let sourceValue = dataSource[document.getElementById(conn.sourceId).attributes["data-row-key"].nodeValue];
        // sourceValue.elementID = conn.sourceId;
        // let targetValue = dataTarget[document.getElementById(conn.targetId).attributes["data-row-key"].nodeValue];
        // targetValue.elementID = conn.targetId;
        // this.state.conn_data.push({source:sourceValue,target:targetValue});
        // console.log(this.state.conn_data);
    }

    function unBuildConnectionData(conn){
        let result = [];
        for(let i = 0; i < conn_data.length; i ++){
            if(conn.sourceId == conn_data[i].source.elementID &&
                conn.targetId == conn_data[i].target.elementID) continue;
            result.push(this.conn_data[i]);
        }
        setCon_data(result);
    }

    function connectionDetached(conn){
        console.log("Операция обработки данных об отключении триггерной линии");
        unBuildConnectionData(conn);
    }

    function initPointId(table, type){
        //const trs = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
        const trs = document.getElementsByClassName("flow_block");
        for(let i = 0; i < trs.length; i ++){

            let value = i;
            // let value = trs[i].attributes["data-row-key"].nodeValue;
            trs[i].setAttribute("id",type + value);
            trs[i].setAttribute("record",type === "source" ? i : i);
            jsPlumbIn.addEndpoint(type + value, {
                anchors: [type === 'source' ? 'Right' : 'Left']
            }, jsPlumbIn_common);
        }
    }

    function drop(event) {
        if(event.dataTransfer.getData("type") === "block")
        {
            if(event.dataTransfer.getData("dragged_state") !== "first"){
                alert("replace")
                let home = document.getElementById("lineContainer");
                let current = current_proc_block;
                let coords = getCoords(home);
                let left = event.pageX - coords.left + 'px';
                let top = event.pageY - coords.top + 'px';

                home.appendChild(current);
                current.style.left = left;
                current.style.top = top;
            }else{
                let home = document.getElementById("lineContainer");
                let coords = getCoords(home);

                let left = event.pageX - coords.left + 'px';
                let top = event.pageY - coords.top + 'px';
                let item =
                    `<div draggable="true" class="flow_block"
                    style="position: absolute; left: ${left};top: ${top}; width: 170px; height: 100px; background-color: #3693EA; border-radius: 10px; display: flex">
                    <textarea class="form-control" rows="2" style="background-color: #9AC9F4; font-size: 0.8em; margin: auto 5px"></textarea>
                </div>`;
                home.insertAdjacentHTML("afterbegin", item);
                event.dataTransfer.setData("dragged_state", "already");
            }
        }
        else if(event.dataTransfer.getData("type") === "comm")
        {
            let home = document.getElementById("lineContainer");
            let coords = getCoords(home);
            let left = event.pageX - coords.left + 'px';
            let top = event.pageY - coords.top + 'px';
            let item =
                `<textarea class="form-control" rows="2" 
                    style="opacity: 1; font-size: 0.8em;z-index: 3; width: 150px; margin: auto 5px; position: absolute; left: ${left};top: ${top}"
                    ></textarea> `;
            home.insertAdjacentHTML("afterbegin", item);
            event.dataTransfer.setData("dragged_state", "already");
        }
        console.log(event.dataTransfer.getData("dragged_state"));


    }
    function dragEnd(event){}

    function saveHandler() {
        alert("ghfjyhl")
        html2canvas(document.getElementById("lineContainer")).then(canvas => {
            document.body.appendChild(canvas)
        });
    }

    return(
        <div className="container" style={{backgroundImage: './images/s3-bg-long-big.jpg'}}>
            <div className="row">
                <h5 className="text-light px-0 mt-2 mb-0">Назад</h5>
                {/*<Flow_block/>*/}
            </div>
            <div className="row">
                <h1 className="text-light px-0 my-4">Процессы "AS IS"</h1>
            </div>
            <div className="row mb-4" style={{height: "65vh"}}>
                <div className="col-8 place_for_drop">
                    <div id="lineContainer" className="droppable" style={{height: "100%", width: "100%", position: "relative"}}
                         onDragOver={(e)=> dragOver(e)}
                         onDragEnter={(e)=> dragEnter(e)}
                         onDragLeave={(e) => dragLeave(e)}
                         onDrop={(e)=> drop(e)}>

                    </div>
                </div>
                <div className="col-4" style={{paddingLeft: "2%"}}>
                    <div className="pt-0 pb-4" style={{height: "40%", display:"flex", flexDirection:"column"}}>
                        <p className="fs-4 text-light mb-1">Блоки:</p>
                        <div className="source_block" style={{width: "45%", display:"flex"}}>
                            <div style={{margin: "auto"}}>
                                <img src={source2}
                                     className="draggable"
                                     onDragStart={(e)=> dragStart(e)} style={{objectFit: "contain", width: "8vw"}}/>
                                <p className="text-light mb-0" style={{textAlign: "center"}}>Часть процесса</p>
                            </div>
                        </div>
                    </div>
                    <div className="py-2" style={{height: "40%", display:"flex",flexDirection:"column"}}>
                        <p className="fs-4 text-light mb-1">Подписи:</p>
                        <div className="source_block" style={{width: "45%", display:"flex"}}>
                            <div style={{margin: "auto"}}>
                                <img src={source3}
                                     onDragStart={(e)=> dragStartRewrite(e)}
                                     style={{objectFit: "contain", width: "6vw"}}/>
                                <p className="text-light mb-0" style={{textAlign: "center"}}>Комментарии</p>
                            </div>
                        </div>

                    </div>
                    <div className="pt-4 pb-0" style={{height: "20%"}}>
                        <p className="fs-4 text-light mb-1">Связи:</p>
                        <button type="button" className="connect action-button shadow" onClick={intLineContainer}>
                            Добавить связь
                        </button>
                    </div>
                </div>
            </div>
            <div className="row justify-content-end">
                <button type="button" onClick={saveHandler} className="save col-3 action-button shadow">
                   Сохранить
                </button>
            </div>
        </div>
    )
}
