import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

const WorkoutEdit = (props) => {
    const [editDesc, setEditDesc] = useState('');
    const [editDef, setEditDef] = useState('');
    const [editRes, setEditResult] = useState('');

    const workoutUpdate = (e, workout) => {
        e.preventDefault();
        fetch(`http://localhost:3000/log/${props.workoutToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({ log: { description: editDesc, definition: editDef, result: editRes } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.token
            })
        })
            .then((res) => {
                props.fetchWorkouts();
                props.updateOff()
            })
    }

    return (
        <Modal isOpen={true}>
            <ModalHeader>Log a Workout</ModalHeader>
            <ModalBody>
                <Form onSubmit={workoutUpdate}>
                    <FormGroup>
                        <Label htmlFor='result'>Edit Result:</Label>
                        <Input name='description' value={editRes} onChange={(e) => setEditResult(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='description'>Edit Description:</Label>
                        <Input name='result' value={editDesc} onChange={(e) => setEditDesc(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='definition'>Edit Definition:</Label>
                        <Input type='select' name='definition' value={editDef} onChange={(e) => setEditDef(e.target.value)}>
                            <option value='Time'>Time</option>
                            <option value='Weight'>Weight</option>
                            <option value='Distance'>Distance</option>
                        </Input>
                    </FormGroup>
                    <Button type='submit'>Update</Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default WorkoutEdit;