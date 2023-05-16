import {
    Avatar,
    Card,
    Col,
    Descriptions,
    Row,
    Skeleton,
    Space,
    Typography,
    message,
} from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
import { useLazyGetWordsQuery } from "../services/dictionary";
import "../styles/Global.scss";

const FreeDictionary = () => {
    const speaker = require("../public/images/speaker.png");
    const [searchWord, setSearchWord] = useState<string>("");
    const [wordDictionary, setWordDictionary] = useState<any>();
    const [audio, setAudio] = useState<HTMLAudioElement>();
    const [messageApi, contextHolder] = message.useMessage();
    const [getWords, { isFetching }] = useLazyGetWordsQuery();
    useEffect(() => {
        console.log("searchWord: ", searchWord);
        if (searchWord) getData();
    }, [searchWord]);
    const getData = async () => {
        try {
            const data = await getWords(searchWord).unwrap();
            setWordDictionary(data[0]);
            setAudio(new Audio(data[0].phonetics[0].audio));
            console.log("wordDictionary", data[0]);
        } catch (err) {
            console.log("err", err);
            setWordDictionary(null);
            messageApi.error("No Definitions Found", 2);
        }
    };

    return (
        <>
            {contextHolder}
            <Row gutter={16}>
                <Col span={24} className="d-center mt-5">
                    <Search
                        className="seach-large"
                        placeholder="Search a word"
                        allowClear
                        enterButton="Search"
                        size="large"
                        loading={isFetching}
                        onSearch={(value) => setSearchWord(value)}
                    />
                </Col>
                <Col span={24} className="mt-5">
                    {wordDictionary ? (
                        <Skeleton loading={isFetching}>
                            <Card
                                hoverable
                                className="result"
                                style={{
                                    maxWidth: 500,
                                    width: "50%",
                                    fontSize: "30px",
                                    cursor: "default",
                                }}
                            >
                                <div className="result-content">
                                    <Avatar
                                        className="result-icon-speaker"
                                        onClick={() => audio.play()}
                                        size={30}
                                        src={speaker}
                                    />
                                    <Typography.Text type="success" strong>
                                        {wordDictionary.word}
                                    </Typography.Text>
                                    <Typography.Text type="secondary">
                                        {wordDictionary.phonetic}
                                    </Typography.Text>

                                    {wordDictionary.meanings?.map((mean) => {
                                        return (
                                            <>
                                                <hr color="#001529" />
                                                <Typography.Text mark>
                                                    {mean.partOfSpeech}
                                                </Typography.Text>
                                                {
                                                    mean.definitions?.map((define) => {
                                                        return (
                                                            <>
                                                                <Typography.Text title="Meaning">
                                                                    {"=>"} {define.definition}
                                                                </Typography.Text>
                                                                <Typography.Text style={{ fontSize: 16 }} type="secondary">
                                                                    Example: {define.example}
                                                                </Typography.Text>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </>
                                        );
                                    })}
                                </div>
                            </Card>
                        </Skeleton>
                    ) : (
                        <Typography.Text mark strong style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                            Please search a word
                        </Typography.Text>
                    )}
                </Col>
            </Row>
        </>
    );
};

export default FreeDictionary;
