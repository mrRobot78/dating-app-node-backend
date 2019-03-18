const admin = require('firebase-admin');

// const serviceAccount = require('./serviceAccountKey.json');
const serviceAccount = {
  type: 'service_account',
  project_id: 'chat-44e39',
  private_key_id: 'a293cd680e747461b40eb86c435461f699ca2dce',
  private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDFYhUqo7wBkCA0\nqp7XsxR1YhGzDmsO1aej2m+/8ngqeYHXOEFSrUsy19f+ezfMiNkAPdgSiGMkPxXI\nEZIzjKR/r9nDi4iKP759Gxh3i0XAB7chQSyHYdOCT4Z8UmXsru/yT61sWf+pmNFN\np2tZjsoRjex03mo3GLzMgpd94zXTsqr+lCixccXPuY7p8NIHESMInztTVRqMUCUZ\ntFRNbSYGyFXT3uNizQaN8BXcnImy18PaK4kKK2nuK88zSpDgijtUMVnIQ0OhHs1/\naLh3wIoEHJXnUOWAQiDE68t2dkLBZ5okIpX9oktpTe8sfyT3BMXKfyiJdSTddph3\nqN/8ImpXAgMBAAECggEAG/TUGfxONkvLPp+6lxh72ahbPhODtvqB9PjiV7soU/PD\nyno4SP/XJSC3LLRtEcuBg2w+/K5T7x/+83MG/xrOIxutaengcUcCsZuIhUi08gmQ\nYZBmldeVlTZdo6F+uDLgNLTI/mNnjQY3rET938BpVGqCnDGdtPy2+PcM1+gPiVKG\n2itWxWvAwGXIvF93Z5T70uKDu6VApbsxtovF94CZdAWq/cf3ZsxPGJ2TA58vuHTy\nAv3NJFe3uw4STPOjV2pAgOrlxDLDHqXI6ss9468c2mIk71hZyt3MJVUwUFzSK+fS\nUMMQRjJ+vLjbG/Ix8+XXXiQkW7CKIQLJaQfB2kuqIQKBgQDxHxX2k507mEov7fmy\nMY4pTvB26PXr84zajDCVZ87zNGdNufyDPs5P3YIcn1Wah1tG4OEag/KDOUyc6H7d\njdICFd8VhvaCQzOZe1LpJe5o6nlxMbnPBuurBQgTjwfWu/4Oy6TH+kEFLkZn1mas\nDPhivkmy1Tpi/lHM2DYZlYMAcQKBgQDRkBPoKivZ44+W0ZkVzZOTgs8ZxzQ7pr/6\niLrhgrGiSg0k8iJv6crUq4CCBJidV8KeWLFO1O2d8LcTwuMBjgtuuWMsF85XcSTm\n3rX9Y2OFh7mAXDKonqeUVzB7Mi+SjDhPKSoEldwfmGDJ/d7MM3qyWQfWzlvuVShj\nMcLN2Id7RwKBgQDas1ple4Bq1He9v3jywnXyS9JZ2HVuXUrN08ghS7Xu7AIjAuXh\nWS8iS4S/V1n6vnjw8fna5gEqOuedjle7tu3bzGC6kt62SiPcO3p5VFlJOhuKqxKg\nj+NkDD1GGD6A66TFYLqGVBtzioR7nIEl3uHQFk6ccUDzFz+0sAtp6y2WUQKBgCK/\npD1j+L95d07H1H2ECAt2rkaU/HlDriOp1mscU74YT1On/sPV3XckNPvaLUAx1CiT\nhlsO/ZOp3YGeWCvi1Mx4WxRtoh5nuXm6xiyM9Wyn07+QCiphnGIBjx1uderz60Zd\nCgWWn9hxWONFgFMV2iuGjcE1mJLNdhP0pVuiotxzAoGAJFeqYF4ZuqYZ6+fmCUGu\nfYlHoBLLw6BsVlopODkHNeOKJ4S2el+HpO/f+OmaLX/LVzwX/pqYT+tvOWITgxHW\nn8V+/H3KBRDqJNiG+iP1xDxvpQqeKjHFkmI/Y9iIbQv95pjsitsH7KEV+Y2sPK8r\nYbugNiOBq3f+Eza5U+vArcQ=\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-jpuab@chat-44e39.iam.gserviceaccount.com',
  client_id: '103134483294526358955',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jpuab%40chat-44e39.iam.gserviceaccount.com',
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://chat-44e39.firebaseio.com',
});

const DB = admin.database();
module.exports = DB;
