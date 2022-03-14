import React, {Component} from 'react';
import {Table,Row, Col,Button} from 'antd';
import 'antd/dist/antd.css';
import jsplumb from 'jsplumb';
const jsPlumbIn = jsplumb.jsPlumb;


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


const dataSource = [
    {id : 123423, name : "row_1"},
    {id : 332, name : "row_2"},
    {id : 3, name : "row_3"},
    {id : 4, name : "row_4"},
    {id : 5, name : "row_5"},
];

const dataTarget = [
    {id : 1, name : "row_1",type : "VARCHAR"},
    {id : 2, name : "row_2",type : "VARCHAR"},
    {id : 3, name : "row_3",type : "VARCHAR"},
    {id : 4, name : "row_4",type : "VARCHAR"},
    {id : 5, name : "row_5",type : "VARCHAR"},
]

const columns = [
    {title : "Исходная таблица", dataIndex : "name", key : "name"}
]

const columns1 = [
    {title : "Целевое поле" ,dataIndex : "name", key : "name"},
{title : "Типы",dataIndex : "type", key : "type"}
]


class TablePage extends Component{

    constructor(props){
        super(props);
        this.state = {
            conn_data :[]
        };
    }

    intLineContainer = () =>{
        var that = this;
        jsPlumbIn.setContainer("lineContainer"); // Контейнер, все связанные элементы должны быть в контейнере.
        const leftTable = document.getElementById("leftTable");
        const rightTable = document.getElementById("rightTable");
        this.initPointId(leftTable,"source");
        this.initPointId(rightTable,"target");
        jsPlumbIn.bind('click', function (conn, originalEvent) {
            if (window.confirm('Вы действительно хотите удалить ссылку, по которой вы нажали? ')) {
                that.deleteConnectionData(conn);
                jsPlumbIn.deleteConnection(conn);
            }
        });
        jsPlumbIn.bind('connection', function (conn) {// Когда две таблицы связаны
            that.connection(conn);
        });
        jsPlumbIn.bind('connectionDetached', function (conn) {// Событие триггера при отключении
            // that.connectionDetached(conn);
        });

    }

    /**
     * Чтобы удалить операцию обработки данных о соединении денег, вы можете использовать connectionDetached () для замены этой функции
     * @param e
     */
    deleteConnectionData = (conn) => {
        console.log("Триггер удалить операцию обработки данных о деньгах");
        this.unBuildConnectionData(conn);
    }

    /**
     * Подключитесь для выполнения операций обработки данных
     * @param conn
     */
    connection = (conn) => {
        // TODO: операция, которая должна быть выполнена для завершения подключения
        this.buildConnectionData(conn);
    }

    /**
     * Создание интерфейса операций с данными службы, соединяющего источник и цель
     * @param conn
     */
    buildConnectionData = (conn) => {
        // TODO: операция, которую необходимо выполнить, когда соединение завершено, elementID - это информация об операции jsPlumbIn, которая используется для обработки данных при удалении соединения
        let sourceValue = dataSource[document.getElementById(conn.sourceId).attributes["data-row-key"].nodeValue];
        sourceValue.elementID = conn.sourceId;
        let targetValue = dataTarget[document.getElementById(conn.targetId).attributes["data-row-key"].nodeValue];
        targetValue.elementID = conn.targetId;
        this.state.conn_data.push({source:sourceValue,target:targetValue});
        console.log(this.state.conn_data);
    }

    /**
     * Удалить интерфейс работы сервисных данных, соединяющий источник и цель
     * @param conn
     */
    unBuildConnectionData = (conn) => {
        let result = [];
        for(let i = 0; i < this.state.conn_data.length; i ++){
            if(conn.sourceId == this.state.conn_data[i].source.elementID &&
                conn.targetId == this.state.conn_data[i].target.elementID) continue;
            result.push(this.state.conn_data[i]);
        }
        this.state.conn_data = result;
        this.setState({conn_data : result});
        console.log(this.state.conn_data);
    }

    /**
     * Операция обработки данных отключается от соединения.Если она запускается операцией удаления, вызовите интерфейс после вызова интерфейса операции удаления.
     * Если соединение прерывается из-за перетаскивания, интерфейс будет вызываться напрямую, что аналогично интерфейсу удаления.
     * @param conn
     */
    connectionDetached = (conn) => {
        console.log("Операция обработки данных об отключении триггерной линии");
        this.unBuildConnectionData(conn);
    }

    /**
     * Чтобы инициализировать операцию конечной точки jsPlumbIn, необходимо дождаться выполнения <div id = {"lineContainer"}> после загрузки внутреннего компонента.
     * @param table
     * @param type
     */
    initPointId(table, type){
        const trs = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
        // const trs = document.getElementsByClassName("flow_block");
        // console.log(trs)
        for(let i = 0; i < trs.length; i ++){

            let value = i;
            // let value = trs[i].attributes["data-row-key"].nodeValue;
            trs[i].setAttribute("id",type + value);
            trs[i].setAttribute("record",type === "source" ? dataSource[i] : dataTarget[i]);
            jsPlumbIn.addEndpoint(type + value, {
                anchors: [type === 'source' ? 'Right' : 'Left']
            }, jsPlumbIn_common);
        }
    }



    render() {
        return (
            <div id={"lineContainer"}>
                <div className={"button-style"}>
                    <Button type="primary" onClick={e => this.intLineContainer(e)}>Инициализация подключения</Button>
                </div>
                <Row>
                    <Col span={4}>
                        <Table id={"leftTable"} className={"table-class"} dataSource={dataSource}
                               columns={columns} pagination={ false } bordered={true}/>
                    </Col>
                    <Col span={6}>
                    </Col>
                    <Col span={4}>
                        <Table id={"rightTable"} className={"table-class"} dataSource={dataTarget}
                               columns={columns1} pagination={ false } bordered={true}/>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default TablePage;
