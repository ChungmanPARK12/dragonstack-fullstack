// src/component/PublicDragonRow.js
import React, { Component } from "react";
import DragonAvatar from "./DragonAvatar";

class PublicDragonRow extends Component {
    render() {
        return (
            <div>
                <div>{this.props.dragon.nickname}</div>
                <DragonAvatar dragon={this.props.dragon} />
                <div>Sale value: {this.props.dragon.saleValue}</div>
            </div>
        )
    }
}

export default PublicDragonRow;