// Author : Toby Sanger 
// Date : 06/05/2025 dd/mm/yyyy

// Description :
// This file defines the About Us page of the Ancestry Tracks Project.
// It provides information about the project, including the university affiliation, project type, and contact details.

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
                fontSize={{ base: "10", sm: "18" }}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                textAlign={"center"}
                padding={4}>
                A University of Westminster Project.
                <br />
                Final Year Project.
                <br />
                @2025.
            </Text>
            <Text 
                padding={8} 
                textAlign={"center"} 
                fontSize={{ base: "10", sm: "15" }}    
                fontWeight={"bold"}
                >

                Student: Toby Sanger
                <br />
                <p>Email: <a href="mailto:w1888481@westminster.ac.uk">w1888481@wesminster.ac.uk</a></p>
            </Text>
        </Container>
       
            
    )
}

export default AboutUs;
