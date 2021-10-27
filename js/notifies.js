export function onSuccess() {
  PNotify.success({
    text: `Request succeeded`,
    delay: 3000,
    stack: new PNotify.Stack({
      dir1: "left",
      dir2: "up", //
      firstpos1: 0,
      firstpos2: 0, //
    }),
  });
}
export function onError(error) {
  PNotify.error({
    text: `Request failed, ${error}`,
    delay: 3000,
    stack: new PNotify.Stack({
      dir1: "left",
      dir2: "up", //
      firstpos1: 0,
      firstpos2: 0, //
    }),
  });
}
