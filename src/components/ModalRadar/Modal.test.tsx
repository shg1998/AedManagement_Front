import {render} from "@testing-library/react";
import Modal from "./Modal";

test('render without crashing',()=>{
    render(<Modal open={true} title={'test'} toggle={()=>{}} />)
})