import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';
import { BACKEND } from '../config';

class AccountDragonsRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nickname: props.dragon.nickname,
            isPublic: props.dragon.isPublic,
            saleValue: props.dragon.saleValue,
            edit: false
        };
        this.updateNickname = this.updateNickname.bind(this);
        this.updateSaleValue = this.updateSaleValue.bind(this);   
        this.updateIsPublic = this.updateIsPublic.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.save = this.save.bind(this);
    }

    updateNickname(event) {
        this.setState({ nickname: event.target.value });
    }

    updateSaleValue(event) {
        this.setState({ saleValue: event.target.value });
    }

    updateIsPublic(event) {
        this.setState({ isPublic: event.target.checked });
    }

    toggleEdit() {
        this.setState({ edit: !this.state.edit });
    }

    save() {
        fetch(`${BACKEND.ADDRESS}/dragon/update`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                dragonId: this.props.dragon.dragonId,
                nickname: this.state.nickname,
                isPublic: this.state.isPublic,
                saleValue: this.state.saleValue
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
                <div>
                    <span>
                        Sale Value: {' '}
                        <input
                            type='number'
                            disabled={!this.state.edit}
                            value={this.state.saleValue}
                            onChange={this.updateSaleValue}
                        />
                    </span>{' '}
                    <span>
                        Public:{' '}
                        <input
                            type='checkbox'
                            disabled={!this.state.edit}
                            value={this.state.isPublic}
                            onChange={this.updateIsPublic}
                        />
                    </span>
                    {
                        this.state.edit ? this.SaveButton : this.EditButton
                    }
                </div>
            </div>
        );
    }
}

export default AccountDragonsRow;
