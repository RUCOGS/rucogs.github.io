export function defaultUserOptions() {
  return <UserOptions>{
    canUpdateUser: false,
    nonExistent: false,
    hasProjects: false,
    deleteUserTooltip: '',
    canDeleteUser: false,
    canManageUserRoles: false,
    canManageEBoardRoles: false,
    canManageEBoard: false,
    canManageMetadata: false,
    canUpdateUserPrivate: false,
    loaded: false,
  };
}

export type UserOptions = {
  canUpdateUser: boolean;
  nonExistent: boolean;
  hasProjects: boolean;
  deleteUserTooltip: string;
  canDeleteUser: boolean;
  canManageUserRoles: boolean;
  canManageEBoardRoles: boolean;
  canManageEBoard: boolean;
  canManageMetadata: boolean;
  canUpdateUserPrivate: boolean;
  loaded: boolean;
};
