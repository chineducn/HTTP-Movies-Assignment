import React from 'react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';

const StyledDiv = styled.div`
    .formikForm {
        color: red;
        width: 55%;
        margin: 1rem auto;
        height: 500px;
        display: flex;
        flex-direction: column;
        justify-items: space-around;

        .formikField {
            color: red;
        }
    }
`;

const MovieForm = props => {
    const { initialForm, updateMovie } = props;
    return (
        <Formik
            key={initialForm.id}
            initialValues={initialForm}
            onSubmit={updateMovie}
            render={props => {
                return (
                    <StyledDiv>
                        <Form className='formikForm'>
                            <Field
                                className='formikField'
                                name='id'
                                type='text'
                                placeholder='id'
                                style={{display:'none'}}
                            />
                            <Field
                                className='formikField'
                                name='title'
                                type='text'
                                placeholder='Title'
                            />
                            <Field
                                className='formikField'
                                name='director'
                                type='text'
                                placeholder='Director'
                            />
                            <Field
                                className='formikField'
                                name='metascore'
                                type='text'
                                placeholder='Metascore'
                            />
                            <Field
                                className='formikField'
                                name='stars'
                                type='text'
                                placeholder='Stars'
                            />
                            <button type='submit'>Submit</button>
                        </Form>
                    </StyledDiv>
                )
            }}
        />
    );
};

export default MovieForm;