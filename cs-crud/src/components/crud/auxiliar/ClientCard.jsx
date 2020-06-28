import React from "react";
import { Delete, Edit } from "@material-ui/icons";
import "./ClientCard.css";
import { IconButton } from "@material-ui/core";

// Create a custom card only with css and html {except the Icons buttons, they a really cute😍}
export default function ClientView(props) {
  return (
    <div className="client-card">
      <div className="profile-header">
        <div className="client-avatar">{props.client.name.charAt(0)}</div>
        <div className="header-data">
          <div className="client-name">
            <span>{props.client.name}</span>
          </div>
          <div className="bi">
            <span>BI: {props.client.bi}</span>
          </div>
        </div>
        {props.user.admin && (
          <div className="client-actions">
            <IconButton
              index={props.clientIndex}
              aria-label="edit"
              className="edit"
              onClick={props.clickEdit}
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              uid={props.client.id}
              aria-label="delete"
              className="del"
              onClick={props.clickDel}
            >
              <Delete fontSize="small" />
            </IconButton>
          </div>
        )}
      </div>
      <div className="profile-body">
        <div className="address">
          <h6>Endereço</h6>
          <div className="address-data">
            <div className="address-fields">
              <span>Cidade</span>
              <span>Logradouro</span>
              <span>Bairro</span>
              <span>ZIPCODE</span>
            </div>
            <div className="address-info">
              <span>{props.client.address.city}</span>
              <span>{props.client.address.publicPlace}</span>
              <span>{props.client.address.neighborHood}</span>
              <span>{props.client.address.zipCode}</span>
            </div>
          </div>
        </div>
        <div className="phones">
          <h6>Telefones</h6>
          <div className="data">
            {props.client.phones.map((phone, index) => (
              <span key={index}>{phone}</span>
            ))}
          </div>
        </div>
        <div className="emails">
          <h6>Emails</h6>
          <div className="data">
            {props.client.emails.map((email, index) => (
              <span key={index}>{email}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
