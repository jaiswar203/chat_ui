import { NextPage } from 'next'
import React from 'react'
import { Avatar, Card, Col, Grid, Row, Text } from '@nextui-org/react'
import Image from 'next/image'

const CardComp: NextPage = () => {
    return (
        <Card className="redfluk__card" css={{ width: "100%", p: "$2 $2",mb:"$5",cursor:"pointer"}}>
            <Card.Header>
                <Row style={{width:"100%"}}>
                    <Avatar src={"https://res.cloudinary.com/dykwfe4cr/image/upload/v1628828168/samples/people/boy-snow-hoodie.jpg"} size="lg" />
                    <Grid.Container css={{ pl: "$6", display: "flex", flexDirection: "column" }}>
                        <Text h4 css={{ margin: "$0" }} >Nilesh Jaiswar</Text>
                        <Text h5 css={{ color: "GrayText" }} >@nilesh123</Text>
                    </Grid.Container>
                </Row>
            </Card.Header>
            <Card.Body css={{pt:"0"}}>
                <Text css={{fontSize:".8rem"}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut laudantium hic quod adipisci et...</Text>
            </Card.Body>
        </Card>
    )
}

export default CardComp