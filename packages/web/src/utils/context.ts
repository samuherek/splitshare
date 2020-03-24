export function checkContextProvider(ctx: any) {
  if (!ctx) {
    throw new Error(
      "Can not find {xxx}'s context. It looks like you forgot to wrap your component in context"
    );
  }
}
