import React from 'react'
import { Card, CardBody, CardFooter, CardHeader, Heading, Divider, Text } from '@chakra-ui/react'
import moment from 'moment'

const Note = ({title, description, createdAt}) => {
    return (
        <Card variant={"filled"}>
            <CardHeader>
                <Heading size={"md"}>{title}</Heading>
            </CardHeader>
            <Divider borderColor={"gray"} />
            <CardBody>
                <Text>{description}</Text>
            </CardBody>
            <Divider borderColor={"gray"} />
            <CardFooter>
                {moment(createdAt).format("DD/MM/YYYY HH:mm:ss")}
            </CardFooter>
        </Card>
    )
}

export default Note