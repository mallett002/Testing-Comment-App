import React from 'react';
import {mount} from 'enzyme';
import CommentBox from 'components/CommentBox';
import Root from 'Root';

let wrapped;

beforeEach(() => {
    wrapped = mount(
        <Root>
            <CommentBox />
        </Root>
    );
});

afterEach(() => {
    wrapped.unmount();
});

it('has a text area and a button', () => {
    expect(wrapped.find('textarea').length).toEqual(1);
    expect(wrapped.find('button').length).toEqual(1);
});

describe('the text area', () => {
    beforeEach(() => {
        // simulate entering text into textarea
        wrapped.find('textarea').simulate('change', {
            target: { value: 'new comment' }
        });

        // force it to rerender, so we don't have to wait for async setState
        wrapped.update();
    });

    it('has a text area that users can type in', () => {
        expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
    });

    it('has a textarea that gets cleared when submitted', () => {
        wrapped.find('form').simulate("submit");
        wrapped.update();
        expect(wrapped.find('textarea').prop('value')).toEqual('');
    });
})