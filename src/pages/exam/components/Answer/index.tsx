import React,{ useEffect, useState, useRef } from "react"
import {Button, Card, Radio, Space, Badge, Row, Col, Tooltip, Modal, message} from "antd"
import { LeftSquareOutlined, RightSquareOutlined, FileDoneOutlined,ExclamationCircleOutlined } from "@ant-design/icons"
import {connect, Dispatch} from 'umi';
import {history} from "umi"
interface AnswerProps {
    dispatch: Dispatch;
}
const Answer: React.FC<AnswerProps> = props => {
    const { dispatch } = props;
    const [value,setValue] = useState<string>();
    const [buttonIndex,setButtonIndex] = useState<number>(0);
    useEffect(()=>{
        //console.log("value值发生了改变:" + value)
    },[value]);
    useEffect(()=>{
        //console.log("buttonIndex值发生了改变:" + buttonIndex)
    },[buttonIndex]);

    //倒计时,只完成分钟和秒钟，时钟有时间再拓展
    const intervalRef = useRef<any>(null);
    // const [hour, setHours] = useState<number>(0);   //小时
    const [minute, setMinutes] = useState<number>(10);  //分钟
    const [second, setSeconds] = useState<number>(10);  //秒
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            if(minute<=0 && second <=0){
                setMinutes(() => 0)
                setSeconds(() => 0)
                clearInterval(intervalRef.current);
            }else {
                if (second <= 0){
                    setMinutes(() => minute-1)
                    setSeconds(() => 59)
                }else {
                    setSeconds(() => second-1)
                }
            }
        }, 1000);
        return () => clearInterval(intervalRef.current);
    }, [second]);

    //点击了题目序号触发的事件
    const selectButton = (index:number): void => {
        if(index < 0 || index>list.length-1) return
        setButtonIndex(index)
        setValue(list[index].checked)
    };

    //点击了单选框触发的事件
    const selectRadio = (value:string): void => {
        list[buttonIndex].checked = value;
        setValue(list[buttonIndex].checked)
        setList(list)
    }

    let list_bak: any[] = [
        {
            id: "01",
            title: "(一打) 是指多少个?",
            buttonType: "primary",
            content: { A: "9", B: "10", C: "11", D: "12" },
            checked: "",
        },
        {
            id: "02",
            title: "感冒忌用下列哪一种食物?",
            buttonType: "default",
            content: { A: "海鱼", B: "豆浆", C: "生菜", D: "生姜" },
            checked: "",
        },
        {
            id: "03",
            title: "洗有颜色的衣服时,先用（）浸泡10分钟,然后再洗,不容易掉色.",
            buttonType: "default",
            content: { A: "漂白水", B: "50%的盐水", C: "59%的盐水", D: "醋" },
            checked: "",
        },
        {
            id: "04",
            title: "柠檬汁有哪些营养含量（）.",
            buttonType: "default",
            content: {
                A: "维生素A和维生素C",
                B: "维生素B1和维生素C",
                C: "维生素C",
                D: "维生素B6",
            },
            checked: "",
        },
        {
            id: "05",
            title: "苹果中含有增强记忆力的微量元素是（）",
            buttonType: "default",
            content: { A: "铁", B: "锌", C: "钙", D: "碘" },
            checked: "",
        },
        {
            id: "06",
            title: "吃太多手摇爆米花机爆出的米花会导致（）",
            buttonType: "default",
            content: { A: "锡中毒", B: "铅中毒", C: "铬中毒", D: "碘中毒" },
            checked: "",
        },
        {
            id: "07",
            title: "低盐饮食有利于预防什么疾病?",
            buttonType: "default",
            content: { A: "乙型肝炎", B: "糖尿病", C: "高血压", D: "贫血" },
            checked: "",
        },
        {
            id: "08",
            title: "关于合理饮食有利于健康的下列说法正确的是（）.",
            buttonType: "default",
            content: {
                A: "没有水就没有生命",
                B: "饮用水越纯净越好",
                C: "养成良好的饮食习惯,多吃蔬菜、水果等碱性食物",
                D: "调味剂和营养剂加得越多越好",
            },
            checked: "",
        },
        {
            id: "09",
            title: "理发吹风前,在头上喷一点（）,洗烫的发式样能长久保持.",
            buttonType: "default",
            content: { A: "盐", B: "醋", C: "洒精", D: "酱油" },
            checked: "",
        },
        {
            id: "10",
            title: "理发吹风前,在头上喷一点（）,洗烫的发式样能长久保持.",
            buttonType: "default",
            content: { A: "盐", B: "醋", C: "洒精", D: "酱油" },
            checked: "",
        },
    ]

    const [list, setList] = useState<any[]>([...list_bak]);


    //提交答案
    const submitAnswers = () => {
        Modal.confirm({
            title: '确认提交答案吗？',
            icon: <ExclamationCircleOutlined />,
            content: '由于您是SSSSSVIP学生，所以您有无数次的考试机会，请放100个心，大胆点确认按钮并提交！',
            onOk() {
                // return new Promise( (resolve, reject) => {
                    onFinish()
                    // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                // }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });
    }


    const onFinish = async () => {
        try {
            let answers: any[] = [];
            list.forEach(item => {
                answers.push(item.checked)
            })
            const param = {id:1, answers: answers}
            const res: any = await dispatch({
                type: 'answer/submitAnswer',
                payload: param,
            });
            console.log(res)
            if (res) {
                message.success('提交成功！');
                history.push({pathname:'result',state:{mark:res.data.mark,answers:answers}})
            }
        } catch (error) {
            console.log(error)
            message.warning('请输入必填项！');
        }
    };






    return (
        <div className="indexlayout-main-conent">
            <Row gutter={16}>
                <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                    <Card bordered={false} title="题目列表" extra={minute === 0 && second === 0 ?<span style={{color:'red'}}>暂停答题,提交答案.</span>:'倒计时：' + minute + '分' + second + '秒'}>
                        {
                            list.map((item,index) => (
                                <Badge key={item.id} dot={!list[index].checked}>
                                    <Button
                                        style={{margin:5}}
                                        disabled={minute === 0 && second === 0}
                                        type={index === buttonIndex?'primary':'default'}
                                        onClick={() => {selectButton(index)}}
                                    >
                                        {item.id}
                                    </Button>
                                </Badge>
                            ))
                        }
                    </Card>
                </Col>
                <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                    <Card bordered={false} title={(buttonIndex+1) + '、' + list[buttonIndex]['title']}
                        extra={
                            <div>
                                <Tooltip placement="bottom" title={'上一题'}>
                                    <LeftSquareOutlined onClick={() => {selectButton(buttonIndex-1)}} style={{ fontSize: '25px', color: '#009688' }} />
                                </Tooltip>
                                <span style={{marginLeft:'20px'}}/>
                                <Tooltip placement="bottom" title={'下一题'}>
                                    <RightSquareOutlined onClick={() => {selectButton(buttonIndex+1)}} style={{ fontSize: '25px', color: '#009688' }} />
                                </Tooltip>
                            </div>
                        }
                          actions={[
                              <Button onClick={submitAnswers} type="primary" icon={<FileDoneOutlined />}>提交答案</Button>
                          ]}
                    >
                        <Radio.Group onChange={(e) => selectRadio(e.target.value)} value={value} disabled={minute === 0 && second === 0}>
                            <Space direction="vertical">
                                <Radio value={'A'}>{list[buttonIndex]['content']['A']}</Radio>
                                <Radio value={'B'}>{list[buttonIndex]['content']['B']}</Radio>
                                <Radio value={'C'}>{list[buttonIndex]['content']['C']}</Radio>
                                <Radio value={'D'}>{list[buttonIndex]['content']['D']}</Radio>
                            </Space>
                        </Radio.Group>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default connect(
    ({
         loading,
     }: {
        loading: {
            effects: {
                [key: string]: boolean;
            };
        };
    }) => ({
        loading: loading.effects['answer/submitAnswer'],
    }),
)(Answer);

