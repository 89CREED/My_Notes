import React, { useState } from 'react'
import { Button, Textarea, Input } from '@chakra-ui/react'


const CreateNoteForm = ({onCreate}) => {

    const[note, setnote] = useState();

    const onSubmit = (e) => {
        e.preventDefault();
        onCreate(note);
        setnote(null);
    }

    return (
        <form onSubmit={onSubmit} className='w-full flex flex-col gap-3'>
            <h3 className='font-bold text-xl'>Create Note</h3>
            <Input placeholder="Title" value={note?.title ?? ""} onChange={(e) => setnote({...note, title: e.target.value})}/>
            <Textarea placeholder='Description' value={note?.description ?? ""} onChange={(e) => setnote({...note, description: e.target.value})}/>
            <Button type='submit' colorScheme='teal'>Create</Button>
        </form>
    )
}

export default CreateNoteForm
