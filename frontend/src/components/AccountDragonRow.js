import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';
import { BACKEND } from '../config';

class AccountDragonsRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nickname: props.dragon.nickname,
            edit: false
        };
        this.updateNickname = this.updateNickname.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.save = this.save.bind(this);
    }

    updateNickname(event) {
        this.setState({ nickname: event.target.value });
    }

    toggleEdit() {
        this.setState({ edit: !this.state.edit });
    }

    save() {
        fetch(`${BACKEND.ADDRESS}/dragon/update`, {
            method: 'PUT',
            credentials: 'include', // ✅ 세션
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                dragonId: this.props.dragon.dragonId,
                nickname: this.state.nickname
            })
        })
            .then(response => response.json())
            .then(json => {
                if (json.type === 'error') {
                    alert(json.message);
                } else {
                    this.toggleEdit(); // edit 모드 종료
                }
            })
            .catch(error => alert(error.message));
    }


    get SaveButton() {
        return <Button onClick={this.save}>Save</Button>;
    }

    get EditButton() {
        return <Button onClick={this.toggleEdit}>Edit</Button>;
    }

    render() {
        return (
            <div>
                <div>{this.props.dragon.nickname}</div>
                <input
                    type='text'
                    value={this.state.nickname}
                    onChange={this.updateNickname}
                    disabled={!this.state.edit}
                />
                <br />
                <DragonAvatar dragon={this.props.dragon} />
                {
                    this.state.edit ? this.SaveButton : this.EditButton
                }
            </div>
        );
    }
}

export default AccountDragonsRow;
