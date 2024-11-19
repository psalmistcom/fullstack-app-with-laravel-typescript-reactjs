<?php

namespace App\Enum;

enum PermissionsEnum : string
{
    case ManageFeatures = 'managme_features';
    case ManageUsers = 'managme_users';
    case ManageComments = 'managme_comments';
    case UpvoteDownvote = 'upvote_downvote';
}
