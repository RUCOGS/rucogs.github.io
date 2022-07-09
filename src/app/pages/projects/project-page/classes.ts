export function defaultProjectOptions() {
  return <ProjectOptions>{
    isMember: false,
    manageSomeMembers: false,
    nonExistent: false,
    canUpdateProject: false,
    inviteSent: false,
    isAuthenticated: false,
    loaded: false,
    canDeleteProject: false,
    canManageMetadata: false,
    canCreateProjectMember: false,
    canJoinProject: false,
  };
}

export type ProjectOptions = {
  isMember: boolean;
  manageSomeMembers: boolean;
  nonExistent: boolean;
  canUpdateProject: boolean;
  canDeleteProject: boolean;
  inviteSent: boolean;
  isAuthenticated: boolean;
  loaded: boolean;
  canManageMetadata: boolean;
  canCreateProjectMember: boolean;
  canJoinProject: boolean;
};
