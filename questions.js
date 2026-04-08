const rounds = [
  {
    id: 1,
    name: "Encrypted Login",
    intro: [
	"⚠ THE SYSTEM IS BEING HACKED...",
	"DANGER!!! ENCRYPTING DATA FILE...",
	"FILES ENCRYPTED! SYSTEM LOCKED OUT!",
	"fetching logs... ..."
    ],
    logs: [
      "critical → 0001[\\0100?_010000010000|_",
      "log → |_01110011",
      "failure → |;00000100|_1010[\\0010"
    ],
    outro: [
	">> Welcome Xazina...",
	">> fetching encrption log...",
	">> '10110010|_0001011101100010' ",
	">> Identify the transformation logic",
	">> ENTER ADMIN KEY:"
    ],
    answer: "welcome"
  },

  {
    id: 2,
    name: "Access Layer",
    intro: [
      "⚠ NETWORK RECONSTRUCTION INITIATED",
      "Service order corrupted."
    ],
    logs: [
      "IAM cannot connect before EC2",
      "S3 must connect after IAM",
      "EC2 is not the last to connect"
    ],
    outro: [
      ">> Determine correct order",
      ">> FORMAT: SERVICE1SERVICE2SERVICE3"
    ],
    answer: "EC2IAMS3"
  },

  {
    id: 3,
    name: "Token Generator",
    intro: [
      "⚠ TOKEN GENERATION SYSTEM ACTIVE",
      "Pattern anomaly detected"
    ],
    logs: [
      "A1 → C3",
      "B2 → E6",
      "C3 → G9"
    ],
    outro: [
      ">> Predict next output for D4",
      ">> ENTER TOKEN:"
    ],
    answer: "I12"
  },

  {
    id: 4,
    name: "Base64 Breach",
    intro: [
      "⚠ DATA PACKET INTERCEPTED",
      "Encoded transmission detected"
    ],
    logs: [
      "QURNSU4=",
      "",
      ">> Decode the string"
    ],
    outro: [
      ">> ENTER DECODED TEXT:"
    ],
    answer: "ADMIN"
  },

  {
    id: 5,
    name: "Binary Override",
    intro: [
      "⚠ LOW LEVEL SYSTEM ACCESS",
      "Binary sequence found"
    ],
    logs: [
      "01001000 01001001"
    ],
    outro: [
      ">> Convert binary to text"
    ],
    answer: "HI"
  },

  {
    id: 6,
    name: "Maze Navigation",
    intro: [
      "⚠ SYSTEM GRID LOCKED",
      "Navigation sequence required"
    ],
    logs: [
      "Start → Right → Right → Down → Left → End"
    ],
    outro: [
      ">> Encode path using initials (R/L/U/D)"
    ],
    answer: "RRDL"
  }
];
