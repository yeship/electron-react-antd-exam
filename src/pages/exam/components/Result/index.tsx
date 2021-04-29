import React from "react"
import {Button, Card, Radio, Result, Space} from "antd"
import {history} from "umi"

interface ExamResultProps {
    location: any
}

const ExamResult: React.FC<ExamResultProps> = props => {

    const { location } = props
    // const mark:number = 0
    // const answers:string[] = ['','','','','','','','','','']
    const mark:number = location.state.mark
    const answers:string[] = location.state.answers

    const list: any[] = [
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

    const answer_list: string[] = ['D','A','C','A','B','B','C','C','B','B']

    return (
        <div className="indexlayout-main-conent">
            <Result
                status="success"
                title={<span>{mark} 分</span>}
                subTitle="祝您前程似锦！"
                extra={[
                    <Button type="primary" onClick={() => {history.replace('/exam/list')}} key="console">
                        返回列表
                    </Button>,
                    <Button onClick={() => {history.replace('/exam/answer')}} key="buy">重新考试</Button>,
                ]}
            />
            {
                list.map((item,index) =>(
                    <Card key={index} style={{marginBottom:'10px'}} bordered={false} title={(index+1) + '、' +item.title}
                          extra={
                              <div>
                                  <span style={{marginLeft:'20px'}}>正确答案：<span style={{color:'#009688'}}>{answer_list[index]}</span>，您的答案：<span style={{color:answer_list[index] === answers[index]?'#009688':'red'}}>{answers[index]?answers[index]:'未答题'}</span></span>
                              </div>
                          }
                    >
                        <Radio.Group  value={answer_list[index]} >
                            <Space direction="vertical">
                                <Radio value={'A'}>{item['content']['A']}</Radio>
                                <Radio value={'B'}>{item['content']['B']}</Radio>
                                <Radio value={'C'}>{item['content']['C']}</Radio>
                                <Radio value={'D'}>{item['content']['D']}</Radio>
                            </Space>
                        </Radio.Group>
                    </Card>
                ))
            }
        </div>
    )
}

export default ExamResult;
