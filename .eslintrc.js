module.exports = {
  extends: 'universe',
  sortImports: [
    'error',
    {
      ignoreCase: false,
      ignoreDeclarationSort: false,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      allowSeparatedGroups: false,
    },
  ],
}
