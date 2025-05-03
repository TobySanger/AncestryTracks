import React from 'react';
import { Container, Text } from '@chakra-ui/react';

const AboutUs = () => {
    return (
        <Container padding={8} maxW="container.md" centerContent>
            <Text
                fontSize={{ base: "10", sm: "20" }}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                textAlign={"center"}
                bgGradient='linear(to-r,rgb(89, 29, 149), #FF0080)'
                bgClip={"text"}
                padding={4}
            >
                The Ancestry Tracks Project 2025
            </Text>
            <Text
                fontSize={{ base: "10", sm: "15" }}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                textAlign={"center"}
                color="white"
                padding={4}>
                A University of Westminster Project.
                <br />
                Final Year Project.
                <br />
                @2025.
            </Text>
            <Text padding={8} textAlign={"center"}>
                Student: Toby Sanger
                <br />
                <p>Email: <a href="mailto:w1888481@westminster.ac.uk">w1888481@wesminster.ac.uk</a></p>
            </Text>
        </Container>
       
            
    )
}

export default AboutUs;
