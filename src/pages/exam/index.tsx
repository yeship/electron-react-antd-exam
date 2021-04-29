import React from "react"
import { EditOutlined} from "@ant-design/icons"
import {Button, Card, List} from "antd"
import {history} from "umi"

interface ExamPageProps {}

const ExamPage: React.FC<ExamPageProps> = props => {

    const list: any[] | undefined = [
        {id:1,title:'试题1',desc:'没有期待 亦没有遗憾',disabled: false},
        {id:2,title:'试题2',desc:'没有期待 亦没有遗憾',disabled: true},
        {id:3,title:'试题3',desc:'没有期待 亦没有遗憾',disabled: true},
        {id:4,title:'试题4',desc:'没有期待 亦没有遗憾',disabled: true},
        {id:5,title:'试题5',desc:'没有期待 亦没有遗憾',disabled: true},
        {id:6,title:'试题6',desc:'没有期待 亦没有遗憾',disabled: true},
        {id:7,title:'试题7',desc:'没有期待 亦没有遗憾',disabled: true},
        {id:8,title:'试题8',desc:'没有期待 亦没有遗憾',disabled: true},
    ]

    return (
        <div className="indexlayout-main-conent">
            <Card bordered={false}>
                <List
                    itemLayout="horizontal"
                    rowKey="id"
                    // loading={loading}
                    dataSource={list}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <Button
                                    type="primary"
                                    icon={<EditOutlined />}
                                    // loading={detailUpdateLoading.includes(item.id)}
                                    disabled={item.disabled}
                                    onClick={() => {history.replace('/exam/answer');}}
                                >
                                    进入考试
                                </Button>
                            ]}
                        >
                            <List.Item.Meta
                                title={item.title}
                                description={item.desc}
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    )
}

export default ExamPage;
