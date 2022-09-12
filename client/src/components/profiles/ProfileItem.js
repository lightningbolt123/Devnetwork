import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({ profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
}}) => {
    return (
        <div className="profile bg-light">
            <img src={avatar} alt="" className="round-img" />
            <div>
                <p>{name}</p>
                <p>{status} {company && <span>at {company}</span>}</p>
                <p>{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className="btn btn-primary">View Profile</Link>
                <ul>
                    {skills.slice(0, 4).map((skill, index) => (
                        <li key={index}>
                            <i className="fas fa-check"></i> {skill}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem
