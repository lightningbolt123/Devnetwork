import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Spinner from '../dashboard/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({ profile: { profile, loading }, auth, match, getProfileById  }) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id])
    return (
        <section className="container">
            {profile === null || loading ? <Spinner /> : 
            (<Fragment>
                <Link to="/profiles" className="btn btn-light">
                    Go Back To Profiles
                </Link>
                {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
                    <Link to="/edit-profile" className="btn btn-dark">
                        Edit Profile
                    </Link>
                )}
                <div className="profile-grid my-1">
                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile} />
                    <div class="profile-exp bg-white p-2">
                        <h2 class="text-primary">Experience</h2>
                        {profile.experiences.length > 0 ? (
                            <Fragment>
                                {profile.experiences.map( experience => (
                                    <ProfileExperience key={experience._id} experience={experience} />
                                ))}
                            </Fragment>
                        ) : (<h4>No experience credentials</h4>)}
                    </div>

                    <div class="profile-edu bg-white p-2">
                        <h2 class="text-primary">Education</h2>
                        {profile.education.length > 0 ? (
                            <Fragment>
                                {profile.education.map( edu => (
                                    <ProfileEducation key={edu._id} education={edu} />
                                ))}
                            </Fragment>
                        ) : (<h4>No education credentials</h4>)}
                    </div>
                    {profile.githubusername && <ProfileGithub username={profile.githubusername} />}
                </div>
            </Fragment>
            )};
        </section>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile);
