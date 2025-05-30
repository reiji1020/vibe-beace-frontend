
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Thread
 * 
 */
export type Thread = $Result.DefaultSelection<Prisma.$ThreadPayload>
/**
 * Model Bead
 * 
 */
export type Bead = $Result.DefaultSelection<Prisma.$BeadPayload>
/**
 * Model CutCloth
 * 
 */
export type CutCloth = $Result.DefaultSelection<Prisma.$CutClothPayload>
/**
 * Model XStitchCloth
 * 
 */
export type XStitchCloth = $Result.DefaultSelection<Prisma.$XStitchClothPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Threads
 * const threads = await prisma.thread.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Threads
   * const threads = await prisma.thread.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.thread`: Exposes CRUD operations for the **Thread** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Threads
    * const threads = await prisma.thread.findMany()
    * ```
    */
  get thread(): Prisma.ThreadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bead`: Exposes CRUD operations for the **Bead** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Beads
    * const beads = await prisma.bead.findMany()
    * ```
    */
  get bead(): Prisma.BeadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cutCloth`: Exposes CRUD operations for the **CutCloth** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CutCloths
    * const cutCloths = await prisma.cutCloth.findMany()
    * ```
    */
  get cutCloth(): Prisma.CutClothDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.xStitchCloth`: Exposes CRUD operations for the **XStitchCloth** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more XStitchCloths
    * const xStitchCloths = await prisma.xStitchCloth.findMany()
    * ```
    */
  get xStitchCloth(): Prisma.XStitchClothDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Thread: 'Thread',
    Bead: 'Bead',
    CutCloth: 'CutCloth',
    XStitchCloth: 'XStitchCloth'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "thread" | "bead" | "cutCloth" | "xStitchCloth"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Thread: {
        payload: Prisma.$ThreadPayload<ExtArgs>
        fields: Prisma.ThreadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ThreadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ThreadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>
          }
          findFirst: {
            args: Prisma.ThreadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ThreadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>
          }
          findMany: {
            args: Prisma.ThreadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>[]
          }
          create: {
            args: Prisma.ThreadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>
          }
          createMany: {
            args: Prisma.ThreadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ThreadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>[]
          }
          delete: {
            args: Prisma.ThreadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>
          }
          update: {
            args: Prisma.ThreadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>
          }
          deleteMany: {
            args: Prisma.ThreadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ThreadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ThreadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>[]
          }
          upsert: {
            args: Prisma.ThreadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>
          }
          aggregate: {
            args: Prisma.ThreadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateThread>
          }
          groupBy: {
            args: Prisma.ThreadGroupByArgs<ExtArgs>
            result: $Utils.Optional<ThreadGroupByOutputType>[]
          }
          count: {
            args: Prisma.ThreadCountArgs<ExtArgs>
            result: $Utils.Optional<ThreadCountAggregateOutputType> | number
          }
        }
      }
      Bead: {
        payload: Prisma.$BeadPayload<ExtArgs>
        fields: Prisma.BeadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BeadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BeadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeadPayload>
          }
          findFirst: {
            args: Prisma.BeadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BeadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeadPayload>
          }
          findMany: {
            args: Prisma.BeadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeadPayload>[]
          }
          create: {
            args: Prisma.BeadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeadPayload>
          }
          createMany: {
            args: Prisma.BeadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BeadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeadPayload>[]
          }
          delete: {
            args: Prisma.BeadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeadPayload>
          }
          update: {
            args: Prisma.BeadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeadPayload>
          }
          deleteMany: {
            args: Prisma.BeadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BeadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BeadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeadPayload>[]
          }
          upsert: {
            args: Prisma.BeadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeadPayload>
          }
          aggregate: {
            args: Prisma.BeadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBead>
          }
          groupBy: {
            args: Prisma.BeadGroupByArgs<ExtArgs>
            result: $Utils.Optional<BeadGroupByOutputType>[]
          }
          count: {
            args: Prisma.BeadCountArgs<ExtArgs>
            result: $Utils.Optional<BeadCountAggregateOutputType> | number
          }
        }
      }
      CutCloth: {
        payload: Prisma.$CutClothPayload<ExtArgs>
        fields: Prisma.CutClothFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CutClothFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CutClothPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CutClothFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CutClothPayload>
          }
          findFirst: {
            args: Prisma.CutClothFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CutClothPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CutClothFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CutClothPayload>
          }
          findMany: {
            args: Prisma.CutClothFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CutClothPayload>[]
          }
          create: {
            args: Prisma.CutClothCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CutClothPayload>
          }
          createMany: {
            args: Prisma.CutClothCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CutClothCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CutClothPayload>[]
          }
          delete: {
            args: Prisma.CutClothDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CutClothPayload>
          }
          update: {
            args: Prisma.CutClothUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CutClothPayload>
          }
          deleteMany: {
            args: Prisma.CutClothDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CutClothUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CutClothUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CutClothPayload>[]
          }
          upsert: {
            args: Prisma.CutClothUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CutClothPayload>
          }
          aggregate: {
            args: Prisma.CutClothAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCutCloth>
          }
          groupBy: {
            args: Prisma.CutClothGroupByArgs<ExtArgs>
            result: $Utils.Optional<CutClothGroupByOutputType>[]
          }
          count: {
            args: Prisma.CutClothCountArgs<ExtArgs>
            result: $Utils.Optional<CutClothCountAggregateOutputType> | number
          }
        }
      }
      XStitchCloth: {
        payload: Prisma.$XStitchClothPayload<ExtArgs>
        fields: Prisma.XStitchClothFieldRefs
        operations: {
          findUnique: {
            args: Prisma.XStitchClothFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$XStitchClothPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.XStitchClothFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$XStitchClothPayload>
          }
          findFirst: {
            args: Prisma.XStitchClothFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$XStitchClothPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.XStitchClothFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$XStitchClothPayload>
          }
          findMany: {
            args: Prisma.XStitchClothFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$XStitchClothPayload>[]
          }
          create: {
            args: Prisma.XStitchClothCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$XStitchClothPayload>
          }
          createMany: {
            args: Prisma.XStitchClothCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.XStitchClothCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$XStitchClothPayload>[]
          }
          delete: {
            args: Prisma.XStitchClothDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$XStitchClothPayload>
          }
          update: {
            args: Prisma.XStitchClothUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$XStitchClothPayload>
          }
          deleteMany: {
            args: Prisma.XStitchClothDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.XStitchClothUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.XStitchClothUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$XStitchClothPayload>[]
          }
          upsert: {
            args: Prisma.XStitchClothUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$XStitchClothPayload>
          }
          aggregate: {
            args: Prisma.XStitchClothAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateXStitchCloth>
          }
          groupBy: {
            args: Prisma.XStitchClothGroupByArgs<ExtArgs>
            result: $Utils.Optional<XStitchClothGroupByOutputType>[]
          }
          count: {
            args: Prisma.XStitchClothCountArgs<ExtArgs>
            result: $Utils.Optional<XStitchClothCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    thread?: ThreadOmit
    bead?: BeadOmit
    cutCloth?: CutClothOmit
    xStitchCloth?: XStitchClothOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Thread
   */

  export type AggregateThread = {
    _count: ThreadCountAggregateOutputType | null
    _avg: ThreadAvgAggregateOutputType | null
    _sum: ThreadSumAggregateOutputType | null
    _min: ThreadMinAggregateOutputType | null
    _max: ThreadMaxAggregateOutputType | null
  }

  export type ThreadAvgAggregateOutputType = {
    id: number | null
    quantity: number | null
  }

  export type ThreadSumAggregateOutputType = {
    id: number | null
    quantity: number | null
  }

  export type ThreadMinAggregateOutputType = {
    id: number | null
    brand: string | null
    colorNumber: string | null
    colorName: string | null
    quantity: number | null
    status: string | null
    wishlist: boolean | null
  }

  export type ThreadMaxAggregateOutputType = {
    id: number | null
    brand: string | null
    colorNumber: string | null
    colorName: string | null
    quantity: number | null
    status: string | null
    wishlist: boolean | null
  }

  export type ThreadCountAggregateOutputType = {
    id: number
    brand: number
    colorNumber: number
    colorName: number
    quantity: number
    status: number
    wishlist: number
    _all: number
  }


  export type ThreadAvgAggregateInputType = {
    id?: true
    quantity?: true
  }

  export type ThreadSumAggregateInputType = {
    id?: true
    quantity?: true
  }

  export type ThreadMinAggregateInputType = {
    id?: true
    brand?: true
    colorNumber?: true
    colorName?: true
    quantity?: true
    status?: true
    wishlist?: true
  }

  export type ThreadMaxAggregateInputType = {
    id?: true
    brand?: true
    colorNumber?: true
    colorName?: true
    quantity?: true
    status?: true
    wishlist?: true
  }

  export type ThreadCountAggregateInputType = {
    id?: true
    brand?: true
    colorNumber?: true
    colorName?: true
    quantity?: true
    status?: true
    wishlist?: true
    _all?: true
  }

  export type ThreadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Thread to aggregate.
     */
    where?: ThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Threads to fetch.
     */
    orderBy?: ThreadOrderByWithRelationInput | ThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Threads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Threads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Threads
    **/
    _count?: true | ThreadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ThreadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ThreadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ThreadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ThreadMaxAggregateInputType
  }

  export type GetThreadAggregateType<T extends ThreadAggregateArgs> = {
        [P in keyof T & keyof AggregateThread]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateThread[P]>
      : GetScalarType<T[P], AggregateThread[P]>
  }




  export type ThreadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ThreadWhereInput
    orderBy?: ThreadOrderByWithAggregationInput | ThreadOrderByWithAggregationInput[]
    by: ThreadScalarFieldEnum[] | ThreadScalarFieldEnum
    having?: ThreadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ThreadCountAggregateInputType | true
    _avg?: ThreadAvgAggregateInputType
    _sum?: ThreadSumAggregateInputType
    _min?: ThreadMinAggregateInputType
    _max?: ThreadMaxAggregateInputType
  }

  export type ThreadGroupByOutputType = {
    id: number
    brand: string
    colorNumber: string
    colorName: string | null
    quantity: number
    status: string | null
    wishlist: boolean
    _count: ThreadCountAggregateOutputType | null
    _avg: ThreadAvgAggregateOutputType | null
    _sum: ThreadSumAggregateOutputType | null
    _min: ThreadMinAggregateOutputType | null
    _max: ThreadMaxAggregateOutputType | null
  }

  type GetThreadGroupByPayload<T extends ThreadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ThreadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ThreadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ThreadGroupByOutputType[P]>
            : GetScalarType<T[P], ThreadGroupByOutputType[P]>
        }
      >
    >


  export type ThreadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    brand?: boolean
    colorNumber?: boolean
    colorName?: boolean
    quantity?: boolean
    status?: boolean
    wishlist?: boolean
  }, ExtArgs["result"]["thread"]>

  export type ThreadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    brand?: boolean
    colorNumber?: boolean
    colorName?: boolean
    quantity?: boolean
    status?: boolean
    wishlist?: boolean
  }, ExtArgs["result"]["thread"]>

  export type ThreadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    brand?: boolean
    colorNumber?: boolean
    colorName?: boolean
    quantity?: boolean
    status?: boolean
    wishlist?: boolean
  }, ExtArgs["result"]["thread"]>

  export type ThreadSelectScalar = {
    id?: boolean
    brand?: boolean
    colorNumber?: boolean
    colorName?: boolean
    quantity?: boolean
    status?: boolean
    wishlist?: boolean
  }

  export type ThreadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "brand" | "colorNumber" | "colorName" | "quantity" | "status" | "wishlist", ExtArgs["result"]["thread"]>

  export type $ThreadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Thread"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      brand: string
      colorNumber: string
      colorName: string | null
      quantity: number
      status: string | null
      wishlist: boolean
    }, ExtArgs["result"]["thread"]>
    composites: {}
  }

  type ThreadGetPayload<S extends boolean | null | undefined | ThreadDefaultArgs> = $Result.GetResult<Prisma.$ThreadPayload, S>

  type ThreadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ThreadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ThreadCountAggregateInputType | true
    }

  export interface ThreadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Thread'], meta: { name: 'Thread' } }
    /**
     * Find zero or one Thread that matches the filter.
     * @param {ThreadFindUniqueArgs} args - Arguments to find a Thread
     * @example
     * // Get one Thread
     * const thread = await prisma.thread.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ThreadFindUniqueArgs>(args: SelectSubset<T, ThreadFindUniqueArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Thread that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ThreadFindUniqueOrThrowArgs} args - Arguments to find a Thread
     * @example
     * // Get one Thread
     * const thread = await prisma.thread.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ThreadFindUniqueOrThrowArgs>(args: SelectSubset<T, ThreadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Thread that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadFindFirstArgs} args - Arguments to find a Thread
     * @example
     * // Get one Thread
     * const thread = await prisma.thread.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ThreadFindFirstArgs>(args?: SelectSubset<T, ThreadFindFirstArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Thread that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadFindFirstOrThrowArgs} args - Arguments to find a Thread
     * @example
     * // Get one Thread
     * const thread = await prisma.thread.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ThreadFindFirstOrThrowArgs>(args?: SelectSubset<T, ThreadFindFirstOrThrowArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Threads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Threads
     * const threads = await prisma.thread.findMany()
     * 
     * // Get first 10 Threads
     * const threads = await prisma.thread.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const threadWithIdOnly = await prisma.thread.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ThreadFindManyArgs>(args?: SelectSubset<T, ThreadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Thread.
     * @param {ThreadCreateArgs} args - Arguments to create a Thread.
     * @example
     * // Create one Thread
     * const Thread = await prisma.thread.create({
     *   data: {
     *     // ... data to create a Thread
     *   }
     * })
     * 
     */
    create<T extends ThreadCreateArgs>(args: SelectSubset<T, ThreadCreateArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Threads.
     * @param {ThreadCreateManyArgs} args - Arguments to create many Threads.
     * @example
     * // Create many Threads
     * const thread = await prisma.thread.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ThreadCreateManyArgs>(args?: SelectSubset<T, ThreadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Threads and returns the data saved in the database.
     * @param {ThreadCreateManyAndReturnArgs} args - Arguments to create many Threads.
     * @example
     * // Create many Threads
     * const thread = await prisma.thread.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Threads and only return the `id`
     * const threadWithIdOnly = await prisma.thread.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ThreadCreateManyAndReturnArgs>(args?: SelectSubset<T, ThreadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Thread.
     * @param {ThreadDeleteArgs} args - Arguments to delete one Thread.
     * @example
     * // Delete one Thread
     * const Thread = await prisma.thread.delete({
     *   where: {
     *     // ... filter to delete one Thread
     *   }
     * })
     * 
     */
    delete<T extends ThreadDeleteArgs>(args: SelectSubset<T, ThreadDeleteArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Thread.
     * @param {ThreadUpdateArgs} args - Arguments to update one Thread.
     * @example
     * // Update one Thread
     * const thread = await prisma.thread.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ThreadUpdateArgs>(args: SelectSubset<T, ThreadUpdateArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Threads.
     * @param {ThreadDeleteManyArgs} args - Arguments to filter Threads to delete.
     * @example
     * // Delete a few Threads
     * const { count } = await prisma.thread.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ThreadDeleteManyArgs>(args?: SelectSubset<T, ThreadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Threads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Threads
     * const thread = await prisma.thread.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ThreadUpdateManyArgs>(args: SelectSubset<T, ThreadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Threads and returns the data updated in the database.
     * @param {ThreadUpdateManyAndReturnArgs} args - Arguments to update many Threads.
     * @example
     * // Update many Threads
     * const thread = await prisma.thread.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Threads and only return the `id`
     * const threadWithIdOnly = await prisma.thread.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ThreadUpdateManyAndReturnArgs>(args: SelectSubset<T, ThreadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Thread.
     * @param {ThreadUpsertArgs} args - Arguments to update or create a Thread.
     * @example
     * // Update or create a Thread
     * const thread = await prisma.thread.upsert({
     *   create: {
     *     // ... data to create a Thread
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Thread we want to update
     *   }
     * })
     */
    upsert<T extends ThreadUpsertArgs>(args: SelectSubset<T, ThreadUpsertArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Threads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadCountArgs} args - Arguments to filter Threads to count.
     * @example
     * // Count the number of Threads
     * const count = await prisma.thread.count({
     *   where: {
     *     // ... the filter for the Threads we want to count
     *   }
     * })
    **/
    count<T extends ThreadCountArgs>(
      args?: Subset<T, ThreadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ThreadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Thread.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ThreadAggregateArgs>(args: Subset<T, ThreadAggregateArgs>): Prisma.PrismaPromise<GetThreadAggregateType<T>>

    /**
     * Group by Thread.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ThreadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ThreadGroupByArgs['orderBy'] }
        : { orderBy?: ThreadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ThreadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetThreadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Thread model
   */
  readonly fields: ThreadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Thread.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ThreadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Thread model
   */
  interface ThreadFieldRefs {
    readonly id: FieldRef<"Thread", 'Int'>
    readonly brand: FieldRef<"Thread", 'String'>
    readonly colorNumber: FieldRef<"Thread", 'String'>
    readonly colorName: FieldRef<"Thread", 'String'>
    readonly quantity: FieldRef<"Thread", 'Int'>
    readonly status: FieldRef<"Thread", 'String'>
    readonly wishlist: FieldRef<"Thread", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Thread findUnique
   */
  export type ThreadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Filter, which Thread to fetch.
     */
    where: ThreadWhereUniqueInput
  }

  /**
   * Thread findUniqueOrThrow
   */
  export type ThreadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Filter, which Thread to fetch.
     */
    where: ThreadWhereUniqueInput
  }

  /**
   * Thread findFirst
   */
  export type ThreadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Filter, which Thread to fetch.
     */
    where?: ThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Threads to fetch.
     */
    orderBy?: ThreadOrderByWithRelationInput | ThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Threads.
     */
    cursor?: ThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Threads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Threads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Threads.
     */
    distinct?: ThreadScalarFieldEnum | ThreadScalarFieldEnum[]
  }

  /**
   * Thread findFirstOrThrow
   */
  export type ThreadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Filter, which Thread to fetch.
     */
    where?: ThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Threads to fetch.
     */
    orderBy?: ThreadOrderByWithRelationInput | ThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Threads.
     */
    cursor?: ThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Threads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Threads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Threads.
     */
    distinct?: ThreadScalarFieldEnum | ThreadScalarFieldEnum[]
  }

  /**
   * Thread findMany
   */
  export type ThreadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Filter, which Threads to fetch.
     */
    where?: ThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Threads to fetch.
     */
    orderBy?: ThreadOrderByWithRelationInput | ThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Threads.
     */
    cursor?: ThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Threads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Threads.
     */
    skip?: number
    distinct?: ThreadScalarFieldEnum | ThreadScalarFieldEnum[]
  }

  /**
   * Thread create
   */
  export type ThreadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * The data needed to create a Thread.
     */
    data: XOR<ThreadCreateInput, ThreadUncheckedCreateInput>
  }

  /**
   * Thread createMany
   */
  export type ThreadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Threads.
     */
    data: ThreadCreateManyInput | ThreadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Thread createManyAndReturn
   */
  export type ThreadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * The data used to create many Threads.
     */
    data: ThreadCreateManyInput | ThreadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Thread update
   */
  export type ThreadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * The data needed to update a Thread.
     */
    data: XOR<ThreadUpdateInput, ThreadUncheckedUpdateInput>
    /**
     * Choose, which Thread to update.
     */
    where: ThreadWhereUniqueInput
  }

  /**
   * Thread updateMany
   */
  export type ThreadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Threads.
     */
    data: XOR<ThreadUpdateManyMutationInput, ThreadUncheckedUpdateManyInput>
    /**
     * Filter which Threads to update
     */
    where?: ThreadWhereInput
    /**
     * Limit how many Threads to update.
     */
    limit?: number
  }

  /**
   * Thread updateManyAndReturn
   */
  export type ThreadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * The data used to update Threads.
     */
    data: XOR<ThreadUpdateManyMutationInput, ThreadUncheckedUpdateManyInput>
    /**
     * Filter which Threads to update
     */
    where?: ThreadWhereInput
    /**
     * Limit how many Threads to update.
     */
    limit?: number
  }

  /**
   * Thread upsert
   */
  export type ThreadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * The filter to search for the Thread to update in case it exists.
     */
    where: ThreadWhereUniqueInput
    /**
     * In case the Thread found by the `where` argument doesn't exist, create a new Thread with this data.
     */
    create: XOR<ThreadCreateInput, ThreadUncheckedCreateInput>
    /**
     * In case the Thread was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ThreadUpdateInput, ThreadUncheckedUpdateInput>
  }

  /**
   * Thread delete
   */
  export type ThreadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Filter which Thread to delete.
     */
    where: ThreadWhereUniqueInput
  }

  /**
   * Thread deleteMany
   */
  export type ThreadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Threads to delete
     */
    where?: ThreadWhereInput
    /**
     * Limit how many Threads to delete.
     */
    limit?: number
  }

  /**
   * Thread without action
   */
  export type ThreadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
  }


  /**
   * Model Bead
   */

  export type AggregateBead = {
    _count: BeadCountAggregateOutputType | null
    _avg: BeadAvgAggregateOutputType | null
    _sum: BeadSumAggregateOutputType | null
    _min: BeadMinAggregateOutputType | null
    _max: BeadMaxAggregateOutputType | null
  }

  export type BeadAvgAggregateOutputType = {
    id: number | null
    quantity: number | null
  }

  export type BeadSumAggregateOutputType = {
    id: number | null
    quantity: number | null
  }

  export type BeadMinAggregateOutputType = {
    id: number | null
    brand: string | null
    itemCode: string | null
    size: string | null
    colorName: string | null
    quantity: number | null
    status: string | null
    wishlist: boolean | null
  }

  export type BeadMaxAggregateOutputType = {
    id: number | null
    brand: string | null
    itemCode: string | null
    size: string | null
    colorName: string | null
    quantity: number | null
    status: string | null
    wishlist: boolean | null
  }

  export type BeadCountAggregateOutputType = {
    id: number
    brand: number
    itemCode: number
    size: number
    colorName: number
    quantity: number
    status: number
    wishlist: number
    _all: number
  }


  export type BeadAvgAggregateInputType = {
    id?: true
    quantity?: true
  }

  export type BeadSumAggregateInputType = {
    id?: true
    quantity?: true
  }

  export type BeadMinAggregateInputType = {
    id?: true
    brand?: true
    itemCode?: true
    size?: true
    colorName?: true
    quantity?: true
    status?: true
    wishlist?: true
  }

  export type BeadMaxAggregateInputType = {
    id?: true
    brand?: true
    itemCode?: true
    size?: true
    colorName?: true
    quantity?: true
    status?: true
    wishlist?: true
  }

  export type BeadCountAggregateInputType = {
    id?: true
    brand?: true
    itemCode?: true
    size?: true
    colorName?: true
    quantity?: true
    status?: true
    wishlist?: true
    _all?: true
  }

  export type BeadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bead to aggregate.
     */
    where?: BeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Beads to fetch.
     */
    orderBy?: BeadOrderByWithRelationInput | BeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Beads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Beads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Beads
    **/
    _count?: true | BeadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BeadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BeadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BeadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BeadMaxAggregateInputType
  }

  export type GetBeadAggregateType<T extends BeadAggregateArgs> = {
        [P in keyof T & keyof AggregateBead]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBead[P]>
      : GetScalarType<T[P], AggregateBead[P]>
  }




  export type BeadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BeadWhereInput
    orderBy?: BeadOrderByWithAggregationInput | BeadOrderByWithAggregationInput[]
    by: BeadScalarFieldEnum[] | BeadScalarFieldEnum
    having?: BeadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BeadCountAggregateInputType | true
    _avg?: BeadAvgAggregateInputType
    _sum?: BeadSumAggregateInputType
    _min?: BeadMinAggregateInputType
    _max?: BeadMaxAggregateInputType
  }

  export type BeadGroupByOutputType = {
    id: number
    brand: string
    itemCode: string
    size: string
    colorName: string | null
    quantity: number
    status: string | null
    wishlist: boolean
    _count: BeadCountAggregateOutputType | null
    _avg: BeadAvgAggregateOutputType | null
    _sum: BeadSumAggregateOutputType | null
    _min: BeadMinAggregateOutputType | null
    _max: BeadMaxAggregateOutputType | null
  }

  type GetBeadGroupByPayload<T extends BeadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BeadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BeadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BeadGroupByOutputType[P]>
            : GetScalarType<T[P], BeadGroupByOutputType[P]>
        }
      >
    >


  export type BeadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    brand?: boolean
    itemCode?: boolean
    size?: boolean
    colorName?: boolean
    quantity?: boolean
    status?: boolean
    wishlist?: boolean
  }, ExtArgs["result"]["bead"]>

  export type BeadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    brand?: boolean
    itemCode?: boolean
    size?: boolean
    colorName?: boolean
    quantity?: boolean
    status?: boolean
    wishlist?: boolean
  }, ExtArgs["result"]["bead"]>

  export type BeadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    brand?: boolean
    itemCode?: boolean
    size?: boolean
    colorName?: boolean
    quantity?: boolean
    status?: boolean
    wishlist?: boolean
  }, ExtArgs["result"]["bead"]>

  export type BeadSelectScalar = {
    id?: boolean
    brand?: boolean
    itemCode?: boolean
    size?: boolean
    colorName?: boolean
    quantity?: boolean
    status?: boolean
    wishlist?: boolean
  }

  export type BeadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "brand" | "itemCode" | "size" | "colorName" | "quantity" | "status" | "wishlist", ExtArgs["result"]["bead"]>

  export type $BeadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bead"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      brand: string
      itemCode: string
      size: string
      colorName: string | null
      quantity: number
      status: string | null
      wishlist: boolean
    }, ExtArgs["result"]["bead"]>
    composites: {}
  }

  type BeadGetPayload<S extends boolean | null | undefined | BeadDefaultArgs> = $Result.GetResult<Prisma.$BeadPayload, S>

  type BeadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BeadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BeadCountAggregateInputType | true
    }

  export interface BeadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bead'], meta: { name: 'Bead' } }
    /**
     * Find zero or one Bead that matches the filter.
     * @param {BeadFindUniqueArgs} args - Arguments to find a Bead
     * @example
     * // Get one Bead
     * const bead = await prisma.bead.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BeadFindUniqueArgs>(args: SelectSubset<T, BeadFindUniqueArgs<ExtArgs>>): Prisma__BeadClient<$Result.GetResult<Prisma.$BeadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bead that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BeadFindUniqueOrThrowArgs} args - Arguments to find a Bead
     * @example
     * // Get one Bead
     * const bead = await prisma.bead.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BeadFindUniqueOrThrowArgs>(args: SelectSubset<T, BeadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BeadClient<$Result.GetResult<Prisma.$BeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bead that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeadFindFirstArgs} args - Arguments to find a Bead
     * @example
     * // Get one Bead
     * const bead = await prisma.bead.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BeadFindFirstArgs>(args?: SelectSubset<T, BeadFindFirstArgs<ExtArgs>>): Prisma__BeadClient<$Result.GetResult<Prisma.$BeadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bead that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeadFindFirstOrThrowArgs} args - Arguments to find a Bead
     * @example
     * // Get one Bead
     * const bead = await prisma.bead.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BeadFindFirstOrThrowArgs>(args?: SelectSubset<T, BeadFindFirstOrThrowArgs<ExtArgs>>): Prisma__BeadClient<$Result.GetResult<Prisma.$BeadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Beads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Beads
     * const beads = await prisma.bead.findMany()
     * 
     * // Get first 10 Beads
     * const beads = await prisma.bead.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const beadWithIdOnly = await prisma.bead.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BeadFindManyArgs>(args?: SelectSubset<T, BeadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bead.
     * @param {BeadCreateArgs} args - Arguments to create a Bead.
     * @example
     * // Create one Bead
     * const Bead = await prisma.bead.create({
     *   data: {
     *     // ... data to create a Bead
     *   }
     * })
     * 
     */
    create<T extends BeadCreateArgs>(args: SelectSubset<T, BeadCreateArgs<ExtArgs>>): Prisma__BeadClient<$Result.GetResult<Prisma.$BeadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Beads.
     * @param {BeadCreateManyArgs} args - Arguments to create many Beads.
     * @example
     * // Create many Beads
     * const bead = await prisma.bead.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BeadCreateManyArgs>(args?: SelectSubset<T, BeadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Beads and returns the data saved in the database.
     * @param {BeadCreateManyAndReturnArgs} args - Arguments to create many Beads.
     * @example
     * // Create many Beads
     * const bead = await prisma.bead.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Beads and only return the `id`
     * const beadWithIdOnly = await prisma.bead.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BeadCreateManyAndReturnArgs>(args?: SelectSubset<T, BeadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BeadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bead.
     * @param {BeadDeleteArgs} args - Arguments to delete one Bead.
     * @example
     * // Delete one Bead
     * const Bead = await prisma.bead.delete({
     *   where: {
     *     // ... filter to delete one Bead
     *   }
     * })
     * 
     */
    delete<T extends BeadDeleteArgs>(args: SelectSubset<T, BeadDeleteArgs<ExtArgs>>): Prisma__BeadClient<$Result.GetResult<Prisma.$BeadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bead.
     * @param {BeadUpdateArgs} args - Arguments to update one Bead.
     * @example
     * // Update one Bead
     * const bead = await prisma.bead.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BeadUpdateArgs>(args: SelectSubset<T, BeadUpdateArgs<ExtArgs>>): Prisma__BeadClient<$Result.GetResult<Prisma.$BeadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Beads.
     * @param {BeadDeleteManyArgs} args - Arguments to filter Beads to delete.
     * @example
     * // Delete a few Beads
     * const { count } = await prisma.bead.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BeadDeleteManyArgs>(args?: SelectSubset<T, BeadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Beads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Beads
     * const bead = await prisma.bead.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BeadUpdateManyArgs>(args: SelectSubset<T, BeadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Beads and returns the data updated in the database.
     * @param {BeadUpdateManyAndReturnArgs} args - Arguments to update many Beads.
     * @example
     * // Update many Beads
     * const bead = await prisma.bead.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Beads and only return the `id`
     * const beadWithIdOnly = await prisma.bead.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BeadUpdateManyAndReturnArgs>(args: SelectSubset<T, BeadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BeadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bead.
     * @param {BeadUpsertArgs} args - Arguments to update or create a Bead.
     * @example
     * // Update or create a Bead
     * const bead = await prisma.bead.upsert({
     *   create: {
     *     // ... data to create a Bead
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bead we want to update
     *   }
     * })
     */
    upsert<T extends BeadUpsertArgs>(args: SelectSubset<T, BeadUpsertArgs<ExtArgs>>): Prisma__BeadClient<$Result.GetResult<Prisma.$BeadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Beads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeadCountArgs} args - Arguments to filter Beads to count.
     * @example
     * // Count the number of Beads
     * const count = await prisma.bead.count({
     *   where: {
     *     // ... the filter for the Beads we want to count
     *   }
     * })
    **/
    count<T extends BeadCountArgs>(
      args?: Subset<T, BeadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BeadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BeadAggregateArgs>(args: Subset<T, BeadAggregateArgs>): Prisma.PrismaPromise<GetBeadAggregateType<T>>

    /**
     * Group by Bead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BeadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BeadGroupByArgs['orderBy'] }
        : { orderBy?: BeadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BeadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBeadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bead model
   */
  readonly fields: BeadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bead.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BeadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Bead model
   */
  interface BeadFieldRefs {
    readonly id: FieldRef<"Bead", 'Int'>
    readonly brand: FieldRef<"Bead", 'String'>
    readonly itemCode: FieldRef<"Bead", 'String'>
    readonly size: FieldRef<"Bead", 'String'>
    readonly colorName: FieldRef<"Bead", 'String'>
    readonly quantity: FieldRef<"Bead", 'Int'>
    readonly status: FieldRef<"Bead", 'String'>
    readonly wishlist: FieldRef<"Bead", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Bead findUnique
   */
  export type BeadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bead
     */
    select?: BeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bead
     */
    omit?: BeadOmit<ExtArgs> | null
    /**
     * Filter, which Bead to fetch.
     */
    where: BeadWhereUniqueInput
  }

  /**
   * Bead findUniqueOrThrow
   */
  export type BeadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bead
     */
    select?: BeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bead
     */
    omit?: BeadOmit<ExtArgs> | null
    /**
     * Filter, which Bead to fetch.
     */
    where: BeadWhereUniqueInput
  }

  /**
   * Bead findFirst
   */
  export type BeadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bead
     */
    select?: BeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bead
     */
    omit?: BeadOmit<ExtArgs> | null
    /**
     * Filter, which Bead to fetch.
     */
    where?: BeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Beads to fetch.
     */
    orderBy?: BeadOrderByWithRelationInput | BeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Beads.
     */
    cursor?: BeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Beads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Beads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Beads.
     */
    distinct?: BeadScalarFieldEnum | BeadScalarFieldEnum[]
  }

  /**
   * Bead findFirstOrThrow
   */
  export type BeadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bead
     */
    select?: BeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bead
     */
    omit?: BeadOmit<ExtArgs> | null
    /**
     * Filter, which Bead to fetch.
     */
    where?: BeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Beads to fetch.
     */
    orderBy?: BeadOrderByWithRelationInput | BeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Beads.
     */
    cursor?: BeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Beads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Beads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Beads.
     */
    distinct?: BeadScalarFieldEnum | BeadScalarFieldEnum[]
  }

  /**
   * Bead findMany
   */
  export type BeadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bead
     */
    select?: BeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bead
     */
    omit?: BeadOmit<ExtArgs> | null
    /**
     * Filter, which Beads to fetch.
     */
    where?: BeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Beads to fetch.
     */
    orderBy?: BeadOrderByWithRelationInput | BeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Beads.
     */
    cursor?: BeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Beads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Beads.
     */
    skip?: number
    distinct?: BeadScalarFieldEnum | BeadScalarFieldEnum[]
  }

  /**
   * Bead create
   */
  export type BeadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bead
     */
    select?: BeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bead
     */
    omit?: BeadOmit<ExtArgs> | null
    /**
     * The data needed to create a Bead.
     */
    data: XOR<BeadCreateInput, BeadUncheckedCreateInput>
  }

  /**
   * Bead createMany
   */
  export type BeadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Beads.
     */
    data: BeadCreateManyInput | BeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bead createManyAndReturn
   */
  export type BeadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bead
     */
    select?: BeadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bead
     */
    omit?: BeadOmit<ExtArgs> | null
    /**
     * The data used to create many Beads.
     */
    data: BeadCreateManyInput | BeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bead update
   */
  export type BeadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bead
     */
    select?: BeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bead
     */
    omit?: BeadOmit<ExtArgs> | null
    /**
     * The data needed to update a Bead.
     */
    data: XOR<BeadUpdateInput, BeadUncheckedUpdateInput>
    /**
     * Choose, which Bead to update.
     */
    where: BeadWhereUniqueInput
  }

  /**
   * Bead updateMany
   */
  export type BeadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Beads.
     */
    data: XOR<BeadUpdateManyMutationInput, BeadUncheckedUpdateManyInput>
    /**
     * Filter which Beads to update
     */
    where?: BeadWhereInput
    /**
     * Limit how many Beads to update.
     */
    limit?: number
  }

  /**
   * Bead updateManyAndReturn
   */
  export type BeadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bead
     */
    select?: BeadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bead
     */
    omit?: BeadOmit<ExtArgs> | null
    /**
     * The data used to update Beads.
     */
    data: XOR<BeadUpdateManyMutationInput, BeadUncheckedUpdateManyInput>
    /**
     * Filter which Beads to update
     */
    where?: BeadWhereInput
    /**
     * Limit how many Beads to update.
     */
    limit?: number
  }

  /**
   * Bead upsert
   */
  export type BeadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bead
     */
    select?: BeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bead
     */
    omit?: BeadOmit<ExtArgs> | null
    /**
     * The filter to search for the Bead to update in case it exists.
     */
    where: BeadWhereUniqueInput
    /**
     * In case the Bead found by the `where` argument doesn't exist, create a new Bead with this data.
     */
    create: XOR<BeadCreateInput, BeadUncheckedCreateInput>
    /**
     * In case the Bead was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BeadUpdateInput, BeadUncheckedUpdateInput>
  }

  /**
   * Bead delete
   */
  export type BeadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bead
     */
    select?: BeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bead
     */
    omit?: BeadOmit<ExtArgs> | null
    /**
     * Filter which Bead to delete.
     */
    where: BeadWhereUniqueInput
  }

  /**
   * Bead deleteMany
   */
  export type BeadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Beads to delete
     */
    where?: BeadWhereInput
    /**
     * Limit how many Beads to delete.
     */
    limit?: number
  }

  /**
   * Bead without action
   */
  export type BeadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bead
     */
    select?: BeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bead
     */
    omit?: BeadOmit<ExtArgs> | null
  }


  /**
   * Model CutCloth
   */

  export type AggregateCutCloth = {
    _count: CutClothCountAggregateOutputType | null
    _avg: CutClothAvgAggregateOutputType | null
    _sum: CutClothSumAggregateOutputType | null
    _min: CutClothMinAggregateOutputType | null
    _max: CutClothMaxAggregateOutputType | null
  }

  export type CutClothAvgAggregateOutputType = {
    id: number | null
    quantity: number | null
  }

  export type CutClothSumAggregateOutputType = {
    id: number | null
    quantity: number | null
  }

  export type CutClothMinAggregateOutputType = {
    id: number | null
    fabricType: string | null
    pattern: string | null
    size: string | null
    quantity: number | null
    status: string | null
    wishlist: boolean | null
  }

  export type CutClothMaxAggregateOutputType = {
    id: number | null
    fabricType: string | null
    pattern: string | null
    size: string | null
    quantity: number | null
    status: string | null
    wishlist: boolean | null
  }

  export type CutClothCountAggregateOutputType = {
    id: number
    fabricType: number
    pattern: number
    size: number
    quantity: number
    status: number
    wishlist: number
    _all: number
  }


  export type CutClothAvgAggregateInputType = {
    id?: true
    quantity?: true
  }

  export type CutClothSumAggregateInputType = {
    id?: true
    quantity?: true
  }

  export type CutClothMinAggregateInputType = {
    id?: true
    fabricType?: true
    pattern?: true
    size?: true
    quantity?: true
    status?: true
    wishlist?: true
  }

  export type CutClothMaxAggregateInputType = {
    id?: true
    fabricType?: true
    pattern?: true
    size?: true
    quantity?: true
    status?: true
    wishlist?: true
  }

  export type CutClothCountAggregateInputType = {
    id?: true
    fabricType?: true
    pattern?: true
    size?: true
    quantity?: true
    status?: true
    wishlist?: true
    _all?: true
  }

  export type CutClothAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CutCloth to aggregate.
     */
    where?: CutClothWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CutCloths to fetch.
     */
    orderBy?: CutClothOrderByWithRelationInput | CutClothOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CutClothWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CutCloths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CutCloths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CutCloths
    **/
    _count?: true | CutClothCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CutClothAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CutClothSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CutClothMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CutClothMaxAggregateInputType
  }

  export type GetCutClothAggregateType<T extends CutClothAggregateArgs> = {
        [P in keyof T & keyof AggregateCutCloth]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCutCloth[P]>
      : GetScalarType<T[P], AggregateCutCloth[P]>
  }




  export type CutClothGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CutClothWhereInput
    orderBy?: CutClothOrderByWithAggregationInput | CutClothOrderByWithAggregationInput[]
    by: CutClothScalarFieldEnum[] | CutClothScalarFieldEnum
    having?: CutClothScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CutClothCountAggregateInputType | true
    _avg?: CutClothAvgAggregateInputType
    _sum?: CutClothSumAggregateInputType
    _min?: CutClothMinAggregateInputType
    _max?: CutClothMaxAggregateInputType
  }

  export type CutClothGroupByOutputType = {
    id: number
    fabricType: string
    pattern: string
    size: string
    quantity: number
    status: string | null
    wishlist: boolean
    _count: CutClothCountAggregateOutputType | null
    _avg: CutClothAvgAggregateOutputType | null
    _sum: CutClothSumAggregateOutputType | null
    _min: CutClothMinAggregateOutputType | null
    _max: CutClothMaxAggregateOutputType | null
  }

  type GetCutClothGroupByPayload<T extends CutClothGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CutClothGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CutClothGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CutClothGroupByOutputType[P]>
            : GetScalarType<T[P], CutClothGroupByOutputType[P]>
        }
      >
    >


  export type CutClothSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fabricType?: boolean
    pattern?: boolean
    size?: boolean
    quantity?: boolean
    status?: boolean
    wishlist?: boolean
  }, ExtArgs["result"]["cutCloth"]>

  export type CutClothSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fabricType?: boolean
    pattern?: boolean
    size?: boolean
    quantity?: boolean
    status?: boolean
    wishlist?: boolean
  }, ExtArgs["result"]["cutCloth"]>

  export type CutClothSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fabricType?: boolean
    pattern?: boolean
    size?: boolean
    quantity?: boolean
    status?: boolean
    wishlist?: boolean
  }, ExtArgs["result"]["cutCloth"]>

  export type CutClothSelectScalar = {
    id?: boolean
    fabricType?: boolean
    pattern?: boolean
    size?: boolean
    quantity?: boolean
    status?: boolean
    wishlist?: boolean
  }

  export type CutClothOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fabricType" | "pattern" | "size" | "quantity" | "status" | "wishlist", ExtArgs["result"]["cutCloth"]>

  export type $CutClothPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CutCloth"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      fabricType: string
      pattern: string
      size: string
      quantity: number
      status: string | null
      wishlist: boolean
    }, ExtArgs["result"]["cutCloth"]>
    composites: {}
  }

  type CutClothGetPayload<S extends boolean | null | undefined | CutClothDefaultArgs> = $Result.GetResult<Prisma.$CutClothPayload, S>

  type CutClothCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CutClothFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CutClothCountAggregateInputType | true
    }

  export interface CutClothDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CutCloth'], meta: { name: 'CutCloth' } }
    /**
     * Find zero or one CutCloth that matches the filter.
     * @param {CutClothFindUniqueArgs} args - Arguments to find a CutCloth
     * @example
     * // Get one CutCloth
     * const cutCloth = await prisma.cutCloth.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CutClothFindUniqueArgs>(args: SelectSubset<T, CutClothFindUniqueArgs<ExtArgs>>): Prisma__CutClothClient<$Result.GetResult<Prisma.$CutClothPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CutCloth that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CutClothFindUniqueOrThrowArgs} args - Arguments to find a CutCloth
     * @example
     * // Get one CutCloth
     * const cutCloth = await prisma.cutCloth.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CutClothFindUniqueOrThrowArgs>(args: SelectSubset<T, CutClothFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CutClothClient<$Result.GetResult<Prisma.$CutClothPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CutCloth that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CutClothFindFirstArgs} args - Arguments to find a CutCloth
     * @example
     * // Get one CutCloth
     * const cutCloth = await prisma.cutCloth.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CutClothFindFirstArgs>(args?: SelectSubset<T, CutClothFindFirstArgs<ExtArgs>>): Prisma__CutClothClient<$Result.GetResult<Prisma.$CutClothPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CutCloth that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CutClothFindFirstOrThrowArgs} args - Arguments to find a CutCloth
     * @example
     * // Get one CutCloth
     * const cutCloth = await prisma.cutCloth.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CutClothFindFirstOrThrowArgs>(args?: SelectSubset<T, CutClothFindFirstOrThrowArgs<ExtArgs>>): Prisma__CutClothClient<$Result.GetResult<Prisma.$CutClothPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CutCloths that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CutClothFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CutCloths
     * const cutCloths = await prisma.cutCloth.findMany()
     * 
     * // Get first 10 CutCloths
     * const cutCloths = await prisma.cutCloth.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cutClothWithIdOnly = await prisma.cutCloth.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CutClothFindManyArgs>(args?: SelectSubset<T, CutClothFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CutClothPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CutCloth.
     * @param {CutClothCreateArgs} args - Arguments to create a CutCloth.
     * @example
     * // Create one CutCloth
     * const CutCloth = await prisma.cutCloth.create({
     *   data: {
     *     // ... data to create a CutCloth
     *   }
     * })
     * 
     */
    create<T extends CutClothCreateArgs>(args: SelectSubset<T, CutClothCreateArgs<ExtArgs>>): Prisma__CutClothClient<$Result.GetResult<Prisma.$CutClothPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CutCloths.
     * @param {CutClothCreateManyArgs} args - Arguments to create many CutCloths.
     * @example
     * // Create many CutCloths
     * const cutCloth = await prisma.cutCloth.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CutClothCreateManyArgs>(args?: SelectSubset<T, CutClothCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CutCloths and returns the data saved in the database.
     * @param {CutClothCreateManyAndReturnArgs} args - Arguments to create many CutCloths.
     * @example
     * // Create many CutCloths
     * const cutCloth = await prisma.cutCloth.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CutCloths and only return the `id`
     * const cutClothWithIdOnly = await prisma.cutCloth.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CutClothCreateManyAndReturnArgs>(args?: SelectSubset<T, CutClothCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CutClothPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CutCloth.
     * @param {CutClothDeleteArgs} args - Arguments to delete one CutCloth.
     * @example
     * // Delete one CutCloth
     * const CutCloth = await prisma.cutCloth.delete({
     *   where: {
     *     // ... filter to delete one CutCloth
     *   }
     * })
     * 
     */
    delete<T extends CutClothDeleteArgs>(args: SelectSubset<T, CutClothDeleteArgs<ExtArgs>>): Prisma__CutClothClient<$Result.GetResult<Prisma.$CutClothPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CutCloth.
     * @param {CutClothUpdateArgs} args - Arguments to update one CutCloth.
     * @example
     * // Update one CutCloth
     * const cutCloth = await prisma.cutCloth.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CutClothUpdateArgs>(args: SelectSubset<T, CutClothUpdateArgs<ExtArgs>>): Prisma__CutClothClient<$Result.GetResult<Prisma.$CutClothPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CutCloths.
     * @param {CutClothDeleteManyArgs} args - Arguments to filter CutCloths to delete.
     * @example
     * // Delete a few CutCloths
     * const { count } = await prisma.cutCloth.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CutClothDeleteManyArgs>(args?: SelectSubset<T, CutClothDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CutCloths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CutClothUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CutCloths
     * const cutCloth = await prisma.cutCloth.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CutClothUpdateManyArgs>(args: SelectSubset<T, CutClothUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CutCloths and returns the data updated in the database.
     * @param {CutClothUpdateManyAndReturnArgs} args - Arguments to update many CutCloths.
     * @example
     * // Update many CutCloths
     * const cutCloth = await prisma.cutCloth.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CutCloths and only return the `id`
     * const cutClothWithIdOnly = await prisma.cutCloth.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CutClothUpdateManyAndReturnArgs>(args: SelectSubset<T, CutClothUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CutClothPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CutCloth.
     * @param {CutClothUpsertArgs} args - Arguments to update or create a CutCloth.
     * @example
     * // Update or create a CutCloth
     * const cutCloth = await prisma.cutCloth.upsert({
     *   create: {
     *     // ... data to create a CutCloth
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CutCloth we want to update
     *   }
     * })
     */
    upsert<T extends CutClothUpsertArgs>(args: SelectSubset<T, CutClothUpsertArgs<ExtArgs>>): Prisma__CutClothClient<$Result.GetResult<Prisma.$CutClothPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CutCloths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CutClothCountArgs} args - Arguments to filter CutCloths to count.
     * @example
     * // Count the number of CutCloths
     * const count = await prisma.cutCloth.count({
     *   where: {
     *     // ... the filter for the CutCloths we want to count
     *   }
     * })
    **/
    count<T extends CutClothCountArgs>(
      args?: Subset<T, CutClothCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CutClothCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CutCloth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CutClothAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CutClothAggregateArgs>(args: Subset<T, CutClothAggregateArgs>): Prisma.PrismaPromise<GetCutClothAggregateType<T>>

    /**
     * Group by CutCloth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CutClothGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CutClothGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CutClothGroupByArgs['orderBy'] }
        : { orderBy?: CutClothGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CutClothGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCutClothGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CutCloth model
   */
  readonly fields: CutClothFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CutCloth.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CutClothClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CutCloth model
   */
  interface CutClothFieldRefs {
    readonly id: FieldRef<"CutCloth", 'Int'>
    readonly fabricType: FieldRef<"CutCloth", 'String'>
    readonly pattern: FieldRef<"CutCloth", 'String'>
    readonly size: FieldRef<"CutCloth", 'String'>
    readonly quantity: FieldRef<"CutCloth", 'Int'>
    readonly status: FieldRef<"CutCloth", 'String'>
    readonly wishlist: FieldRef<"CutCloth", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * CutCloth findUnique
   */
  export type CutClothFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CutCloth
     */
    select?: CutClothSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CutCloth
     */
    omit?: CutClothOmit<ExtArgs> | null
    /**
     * Filter, which CutCloth to fetch.
     */
    where: CutClothWhereUniqueInput
  }

  /**
   * CutCloth findUniqueOrThrow
   */
  export type CutClothFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CutCloth
     */
    select?: CutClothSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CutCloth
     */
    omit?: CutClothOmit<ExtArgs> | null
    /**
     * Filter, which CutCloth to fetch.
     */
    where: CutClothWhereUniqueInput
  }

  /**
   * CutCloth findFirst
   */
  export type CutClothFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CutCloth
     */
    select?: CutClothSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CutCloth
     */
    omit?: CutClothOmit<ExtArgs> | null
    /**
     * Filter, which CutCloth to fetch.
     */
    where?: CutClothWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CutCloths to fetch.
     */
    orderBy?: CutClothOrderByWithRelationInput | CutClothOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CutCloths.
     */
    cursor?: CutClothWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CutCloths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CutCloths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CutCloths.
     */
    distinct?: CutClothScalarFieldEnum | CutClothScalarFieldEnum[]
  }

  /**
   * CutCloth findFirstOrThrow
   */
  export type CutClothFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CutCloth
     */
    select?: CutClothSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CutCloth
     */
    omit?: CutClothOmit<ExtArgs> | null
    /**
     * Filter, which CutCloth to fetch.
     */
    where?: CutClothWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CutCloths to fetch.
     */
    orderBy?: CutClothOrderByWithRelationInput | CutClothOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CutCloths.
     */
    cursor?: CutClothWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CutCloths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CutCloths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CutCloths.
     */
    distinct?: CutClothScalarFieldEnum | CutClothScalarFieldEnum[]
  }

  /**
   * CutCloth findMany
   */
  export type CutClothFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CutCloth
     */
    select?: CutClothSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CutCloth
     */
    omit?: CutClothOmit<ExtArgs> | null
    /**
     * Filter, which CutCloths to fetch.
     */
    where?: CutClothWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CutCloths to fetch.
     */
    orderBy?: CutClothOrderByWithRelationInput | CutClothOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CutCloths.
     */
    cursor?: CutClothWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CutCloths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CutCloths.
     */
    skip?: number
    distinct?: CutClothScalarFieldEnum | CutClothScalarFieldEnum[]
  }

  /**
   * CutCloth create
   */
  export type CutClothCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CutCloth
     */
    select?: CutClothSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CutCloth
     */
    omit?: CutClothOmit<ExtArgs> | null
    /**
     * The data needed to create a CutCloth.
     */
    data: XOR<CutClothCreateInput, CutClothUncheckedCreateInput>
  }

  /**
   * CutCloth createMany
   */
  export type CutClothCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CutCloths.
     */
    data: CutClothCreateManyInput | CutClothCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CutCloth createManyAndReturn
   */
  export type CutClothCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CutCloth
     */
    select?: CutClothSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CutCloth
     */
    omit?: CutClothOmit<ExtArgs> | null
    /**
     * The data used to create many CutCloths.
     */
    data: CutClothCreateManyInput | CutClothCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CutCloth update
   */
  export type CutClothUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CutCloth
     */
    select?: CutClothSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CutCloth
     */
    omit?: CutClothOmit<ExtArgs> | null
    /**
     * The data needed to update a CutCloth.
     */
    data: XOR<CutClothUpdateInput, CutClothUncheckedUpdateInput>
    /**
     * Choose, which CutCloth to update.
     */
    where: CutClothWhereUniqueInput
  }

  /**
   * CutCloth updateMany
   */
  export type CutClothUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CutCloths.
     */
    data: XOR<CutClothUpdateManyMutationInput, CutClothUncheckedUpdateManyInput>
    /**
     * Filter which CutCloths to update
     */
    where?: CutClothWhereInput
    /**
     * Limit how many CutCloths to update.
     */
    limit?: number
  }

  /**
   * CutCloth updateManyAndReturn
   */
  export type CutClothUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CutCloth
     */
    select?: CutClothSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CutCloth
     */
    omit?: CutClothOmit<ExtArgs> | null
    /**
     * The data used to update CutCloths.
     */
    data: XOR<CutClothUpdateManyMutationInput, CutClothUncheckedUpdateManyInput>
    /**
     * Filter which CutCloths to update
     */
    where?: CutClothWhereInput
    /**
     * Limit how many CutCloths to update.
     */
    limit?: number
  }

  /**
   * CutCloth upsert
   */
  export type CutClothUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CutCloth
     */
    select?: CutClothSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CutCloth
     */
    omit?: CutClothOmit<ExtArgs> | null
    /**
     * The filter to search for the CutCloth to update in case it exists.
     */
    where: CutClothWhereUniqueInput
    /**
     * In case the CutCloth found by the `where` argument doesn't exist, create a new CutCloth with this data.
     */
    create: XOR<CutClothCreateInput, CutClothUncheckedCreateInput>
    /**
     * In case the CutCloth was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CutClothUpdateInput, CutClothUncheckedUpdateInput>
  }

  /**
   * CutCloth delete
   */
  export type CutClothDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CutCloth
     */
    select?: CutClothSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CutCloth
     */
    omit?: CutClothOmit<ExtArgs> | null
    /**
     * Filter which CutCloth to delete.
     */
    where: CutClothWhereUniqueInput
  }

  /**
   * CutCloth deleteMany
   */
  export type CutClothDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CutCloths to delete
     */
    where?: CutClothWhereInput
    /**
     * Limit how many CutCloths to delete.
     */
    limit?: number
  }

  /**
   * CutCloth without action
   */
  export type CutClothDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CutCloth
     */
    select?: CutClothSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CutCloth
     */
    omit?: CutClothOmit<ExtArgs> | null
  }


  /**
   * Model XStitchCloth
   */

  export type AggregateXStitchCloth = {
    _count: XStitchClothCountAggregateOutputType | null
    _avg: XStitchClothAvgAggregateOutputType | null
    _sum: XStitchClothSumAggregateOutputType | null
    _min: XStitchClothMinAggregateOutputType | null
    _max: XStitchClothMaxAggregateOutputType | null
  }

  export type XStitchClothAvgAggregateOutputType = {
    id: number | null
    quantity: number | null
  }

  export type XStitchClothSumAggregateOutputType = {
    id: number | null
    quantity: number | null
  }

  export type XStitchClothMinAggregateOutputType = {
    id: number | null
    count: string | null
    color: string | null
    size: string | null
    quantity: number | null
    status: string | null
    wishlist: boolean | null
  }

  export type XStitchClothMaxAggregateOutputType = {
    id: number | null
    count: string | null
    color: string | null
    size: string | null
    quantity: number | null
    status: string | null
    wishlist: boolean | null
  }

  export type XStitchClothCountAggregateOutputType = {
    id: number
    count: number
    color: number
    size: number
    quantity: number
    status: number
    wishlist: number
    _all: number
  }


  export type XStitchClothAvgAggregateInputType = {
    id?: true
    quantity?: true
  }

  export type XStitchClothSumAggregateInputType = {
    id?: true
    quantity?: true
  }

  export type XStitchClothMinAggregateInputType = {
    id?: true
    count?: true
    color?: true
    size?: true
    quantity?: true
    status?: true
    wishlist?: true
  }

  export type XStitchClothMaxAggregateInputType = {
    id?: true
    count?: true
    color?: true
    size?: true
    quantity?: true
    status?: true
    wishlist?: true
  }

  export type XStitchClothCountAggregateInputType = {
    id?: true
    count?: true
    color?: true
    size?: true
    quantity?: true
    status?: true
    wishlist?: true
    _all?: true
  }

  export type XStitchClothAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which XStitchCloth to aggregate.
     */
    where?: XStitchClothWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of XStitchCloths to fetch.
     */
    orderBy?: XStitchClothOrderByWithRelationInput | XStitchClothOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: XStitchClothWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` XStitchCloths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` XStitchCloths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned XStitchCloths
    **/
    _count?: true | XStitchClothCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: XStitchClothAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: XStitchClothSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: XStitchClothMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: XStitchClothMaxAggregateInputType
  }

  export type GetXStitchClothAggregateType<T extends XStitchClothAggregateArgs> = {
        [P in keyof T & keyof AggregateXStitchCloth]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateXStitchCloth[P]>
      : GetScalarType<T[P], AggregateXStitchCloth[P]>
  }




  export type XStitchClothGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: XStitchClothWhereInput
    orderBy?: XStitchClothOrderByWithAggregationInput | XStitchClothOrderByWithAggregationInput[]
    by: XStitchClothScalarFieldEnum[] | XStitchClothScalarFieldEnum
    having?: XStitchClothScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: XStitchClothCountAggregateInputType | true
    _avg?: XStitchClothAvgAggregateInputType
    _sum?: XStitchClothSumAggregateInputType
    _min?: XStitchClothMinAggregateInputType
    _max?: XStitchClothMaxAggregateInputType
  }

  export type XStitchClothGroupByOutputType = {
    id: number
    count: string
    color: string
    size: string
    quantity: number
    status: string | null
    wishlist: boolean
    _count: XStitchClothCountAggregateOutputType | null
    _avg: XStitchClothAvgAggregateOutputType | null
    _sum: XStitchClothSumAggregateOutputType | null
    _min: XStitchClothMinAggregateOutputType | null
    _max: XStitchClothMaxAggregateOutputType | null
  }

  type GetXStitchClothGroupByPayload<T extends XStitchClothGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<XStitchClothGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof XStitchClothGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], XStitchClothGroupByOutputType[P]>
            : GetScalarType<T[P], XStitchClothGroupByOutputType[P]>
        }
      >
    >


  export type XStitchClothSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    count?: boolean
    color?: boolean
    size?: boolean
    quantity?: boolean
    status?: boolean
    wishlist?: boolean
  }, ExtArgs["result"]["xStitchCloth"]>

  export type XStitchClothSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    count?: boolean
    color?: boolean
    size?: boolean
    quantity?: boolean
    status?: boolean
    wishlist?: boolean
  }, ExtArgs["result"]["xStitchCloth"]>

  export type XStitchClothSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    count?: boolean
    color?: boolean
    size?: boolean
    quantity?: boolean
    status?: boolean
    wishlist?: boolean
  }, ExtArgs["result"]["xStitchCloth"]>

  export type XStitchClothSelectScalar = {
    id?: boolean
    count?: boolean
    color?: boolean
    size?: boolean
    quantity?: boolean
    status?: boolean
    wishlist?: boolean
  }

  export type XStitchClothOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "count" | "color" | "size" | "quantity" | "status" | "wishlist", ExtArgs["result"]["xStitchCloth"]>

  export type $XStitchClothPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "XStitchCloth"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      count: string
      color: string
      size: string
      quantity: number
      status: string | null
      wishlist: boolean
    }, ExtArgs["result"]["xStitchCloth"]>
    composites: {}
  }

  type XStitchClothGetPayload<S extends boolean | null | undefined | XStitchClothDefaultArgs> = $Result.GetResult<Prisma.$XStitchClothPayload, S>

  type XStitchClothCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<XStitchClothFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: XStitchClothCountAggregateInputType | true
    }

  export interface XStitchClothDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['XStitchCloth'], meta: { name: 'XStitchCloth' } }
    /**
     * Find zero or one XStitchCloth that matches the filter.
     * @param {XStitchClothFindUniqueArgs} args - Arguments to find a XStitchCloth
     * @example
     * // Get one XStitchCloth
     * const xStitchCloth = await prisma.xStitchCloth.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends XStitchClothFindUniqueArgs>(args: SelectSubset<T, XStitchClothFindUniqueArgs<ExtArgs>>): Prisma__XStitchClothClient<$Result.GetResult<Prisma.$XStitchClothPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one XStitchCloth that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {XStitchClothFindUniqueOrThrowArgs} args - Arguments to find a XStitchCloth
     * @example
     * // Get one XStitchCloth
     * const xStitchCloth = await prisma.xStitchCloth.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends XStitchClothFindUniqueOrThrowArgs>(args: SelectSubset<T, XStitchClothFindUniqueOrThrowArgs<ExtArgs>>): Prisma__XStitchClothClient<$Result.GetResult<Prisma.$XStitchClothPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first XStitchCloth that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {XStitchClothFindFirstArgs} args - Arguments to find a XStitchCloth
     * @example
     * // Get one XStitchCloth
     * const xStitchCloth = await prisma.xStitchCloth.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends XStitchClothFindFirstArgs>(args?: SelectSubset<T, XStitchClothFindFirstArgs<ExtArgs>>): Prisma__XStitchClothClient<$Result.GetResult<Prisma.$XStitchClothPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first XStitchCloth that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {XStitchClothFindFirstOrThrowArgs} args - Arguments to find a XStitchCloth
     * @example
     * // Get one XStitchCloth
     * const xStitchCloth = await prisma.xStitchCloth.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends XStitchClothFindFirstOrThrowArgs>(args?: SelectSubset<T, XStitchClothFindFirstOrThrowArgs<ExtArgs>>): Prisma__XStitchClothClient<$Result.GetResult<Prisma.$XStitchClothPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more XStitchCloths that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {XStitchClothFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all XStitchCloths
     * const xStitchCloths = await prisma.xStitchCloth.findMany()
     * 
     * // Get first 10 XStitchCloths
     * const xStitchCloths = await prisma.xStitchCloth.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const xStitchClothWithIdOnly = await prisma.xStitchCloth.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends XStitchClothFindManyArgs>(args?: SelectSubset<T, XStitchClothFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$XStitchClothPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a XStitchCloth.
     * @param {XStitchClothCreateArgs} args - Arguments to create a XStitchCloth.
     * @example
     * // Create one XStitchCloth
     * const XStitchCloth = await prisma.xStitchCloth.create({
     *   data: {
     *     // ... data to create a XStitchCloth
     *   }
     * })
     * 
     */
    create<T extends XStitchClothCreateArgs>(args: SelectSubset<T, XStitchClothCreateArgs<ExtArgs>>): Prisma__XStitchClothClient<$Result.GetResult<Prisma.$XStitchClothPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many XStitchCloths.
     * @param {XStitchClothCreateManyArgs} args - Arguments to create many XStitchCloths.
     * @example
     * // Create many XStitchCloths
     * const xStitchCloth = await prisma.xStitchCloth.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends XStitchClothCreateManyArgs>(args?: SelectSubset<T, XStitchClothCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many XStitchCloths and returns the data saved in the database.
     * @param {XStitchClothCreateManyAndReturnArgs} args - Arguments to create many XStitchCloths.
     * @example
     * // Create many XStitchCloths
     * const xStitchCloth = await prisma.xStitchCloth.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many XStitchCloths and only return the `id`
     * const xStitchClothWithIdOnly = await prisma.xStitchCloth.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends XStitchClothCreateManyAndReturnArgs>(args?: SelectSubset<T, XStitchClothCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$XStitchClothPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a XStitchCloth.
     * @param {XStitchClothDeleteArgs} args - Arguments to delete one XStitchCloth.
     * @example
     * // Delete one XStitchCloth
     * const XStitchCloth = await prisma.xStitchCloth.delete({
     *   where: {
     *     // ... filter to delete one XStitchCloth
     *   }
     * })
     * 
     */
    delete<T extends XStitchClothDeleteArgs>(args: SelectSubset<T, XStitchClothDeleteArgs<ExtArgs>>): Prisma__XStitchClothClient<$Result.GetResult<Prisma.$XStitchClothPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one XStitchCloth.
     * @param {XStitchClothUpdateArgs} args - Arguments to update one XStitchCloth.
     * @example
     * // Update one XStitchCloth
     * const xStitchCloth = await prisma.xStitchCloth.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends XStitchClothUpdateArgs>(args: SelectSubset<T, XStitchClothUpdateArgs<ExtArgs>>): Prisma__XStitchClothClient<$Result.GetResult<Prisma.$XStitchClothPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more XStitchCloths.
     * @param {XStitchClothDeleteManyArgs} args - Arguments to filter XStitchCloths to delete.
     * @example
     * // Delete a few XStitchCloths
     * const { count } = await prisma.xStitchCloth.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends XStitchClothDeleteManyArgs>(args?: SelectSubset<T, XStitchClothDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more XStitchCloths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {XStitchClothUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many XStitchCloths
     * const xStitchCloth = await prisma.xStitchCloth.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends XStitchClothUpdateManyArgs>(args: SelectSubset<T, XStitchClothUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more XStitchCloths and returns the data updated in the database.
     * @param {XStitchClothUpdateManyAndReturnArgs} args - Arguments to update many XStitchCloths.
     * @example
     * // Update many XStitchCloths
     * const xStitchCloth = await prisma.xStitchCloth.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more XStitchCloths and only return the `id`
     * const xStitchClothWithIdOnly = await prisma.xStitchCloth.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends XStitchClothUpdateManyAndReturnArgs>(args: SelectSubset<T, XStitchClothUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$XStitchClothPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one XStitchCloth.
     * @param {XStitchClothUpsertArgs} args - Arguments to update or create a XStitchCloth.
     * @example
     * // Update or create a XStitchCloth
     * const xStitchCloth = await prisma.xStitchCloth.upsert({
     *   create: {
     *     // ... data to create a XStitchCloth
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the XStitchCloth we want to update
     *   }
     * })
     */
    upsert<T extends XStitchClothUpsertArgs>(args: SelectSubset<T, XStitchClothUpsertArgs<ExtArgs>>): Prisma__XStitchClothClient<$Result.GetResult<Prisma.$XStitchClothPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of XStitchCloths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {XStitchClothCountArgs} args - Arguments to filter XStitchCloths to count.
     * @example
     * // Count the number of XStitchCloths
     * const count = await prisma.xStitchCloth.count({
     *   where: {
     *     // ... the filter for the XStitchCloths we want to count
     *   }
     * })
    **/
    count<T extends XStitchClothCountArgs>(
      args?: Subset<T, XStitchClothCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], XStitchClothCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a XStitchCloth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {XStitchClothAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends XStitchClothAggregateArgs>(args: Subset<T, XStitchClothAggregateArgs>): Prisma.PrismaPromise<GetXStitchClothAggregateType<T>>

    /**
     * Group by XStitchCloth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {XStitchClothGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends XStitchClothGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: XStitchClothGroupByArgs['orderBy'] }
        : { orderBy?: XStitchClothGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, XStitchClothGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetXStitchClothGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the XStitchCloth model
   */
  readonly fields: XStitchClothFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for XStitchCloth.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__XStitchClothClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the XStitchCloth model
   */
  interface XStitchClothFieldRefs {
    readonly id: FieldRef<"XStitchCloth", 'Int'>
    readonly count: FieldRef<"XStitchCloth", 'String'>
    readonly color: FieldRef<"XStitchCloth", 'String'>
    readonly size: FieldRef<"XStitchCloth", 'String'>
    readonly quantity: FieldRef<"XStitchCloth", 'Int'>
    readonly status: FieldRef<"XStitchCloth", 'String'>
    readonly wishlist: FieldRef<"XStitchCloth", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * XStitchCloth findUnique
   */
  export type XStitchClothFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XStitchCloth
     */
    select?: XStitchClothSelect<ExtArgs> | null
    /**
     * Omit specific fields from the XStitchCloth
     */
    omit?: XStitchClothOmit<ExtArgs> | null
    /**
     * Filter, which XStitchCloth to fetch.
     */
    where: XStitchClothWhereUniqueInput
  }

  /**
   * XStitchCloth findUniqueOrThrow
   */
  export type XStitchClothFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XStitchCloth
     */
    select?: XStitchClothSelect<ExtArgs> | null
    /**
     * Omit specific fields from the XStitchCloth
     */
    omit?: XStitchClothOmit<ExtArgs> | null
    /**
     * Filter, which XStitchCloth to fetch.
     */
    where: XStitchClothWhereUniqueInput
  }

  /**
   * XStitchCloth findFirst
   */
  export type XStitchClothFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XStitchCloth
     */
    select?: XStitchClothSelect<ExtArgs> | null
    /**
     * Omit specific fields from the XStitchCloth
     */
    omit?: XStitchClothOmit<ExtArgs> | null
    /**
     * Filter, which XStitchCloth to fetch.
     */
    where?: XStitchClothWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of XStitchCloths to fetch.
     */
    orderBy?: XStitchClothOrderByWithRelationInput | XStitchClothOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for XStitchCloths.
     */
    cursor?: XStitchClothWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` XStitchCloths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` XStitchCloths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of XStitchCloths.
     */
    distinct?: XStitchClothScalarFieldEnum | XStitchClothScalarFieldEnum[]
  }

  /**
   * XStitchCloth findFirstOrThrow
   */
  export type XStitchClothFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XStitchCloth
     */
    select?: XStitchClothSelect<ExtArgs> | null
    /**
     * Omit specific fields from the XStitchCloth
     */
    omit?: XStitchClothOmit<ExtArgs> | null
    /**
     * Filter, which XStitchCloth to fetch.
     */
    where?: XStitchClothWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of XStitchCloths to fetch.
     */
    orderBy?: XStitchClothOrderByWithRelationInput | XStitchClothOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for XStitchCloths.
     */
    cursor?: XStitchClothWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` XStitchCloths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` XStitchCloths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of XStitchCloths.
     */
    distinct?: XStitchClothScalarFieldEnum | XStitchClothScalarFieldEnum[]
  }

  /**
   * XStitchCloth findMany
   */
  export type XStitchClothFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XStitchCloth
     */
    select?: XStitchClothSelect<ExtArgs> | null
    /**
     * Omit specific fields from the XStitchCloth
     */
    omit?: XStitchClothOmit<ExtArgs> | null
    /**
     * Filter, which XStitchCloths to fetch.
     */
    where?: XStitchClothWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of XStitchCloths to fetch.
     */
    orderBy?: XStitchClothOrderByWithRelationInput | XStitchClothOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing XStitchCloths.
     */
    cursor?: XStitchClothWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` XStitchCloths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` XStitchCloths.
     */
    skip?: number
    distinct?: XStitchClothScalarFieldEnum | XStitchClothScalarFieldEnum[]
  }

  /**
   * XStitchCloth create
   */
  export type XStitchClothCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XStitchCloth
     */
    select?: XStitchClothSelect<ExtArgs> | null
    /**
     * Omit specific fields from the XStitchCloth
     */
    omit?: XStitchClothOmit<ExtArgs> | null
    /**
     * The data needed to create a XStitchCloth.
     */
    data: XOR<XStitchClothCreateInput, XStitchClothUncheckedCreateInput>
  }

  /**
   * XStitchCloth createMany
   */
  export type XStitchClothCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many XStitchCloths.
     */
    data: XStitchClothCreateManyInput | XStitchClothCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * XStitchCloth createManyAndReturn
   */
  export type XStitchClothCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XStitchCloth
     */
    select?: XStitchClothSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the XStitchCloth
     */
    omit?: XStitchClothOmit<ExtArgs> | null
    /**
     * The data used to create many XStitchCloths.
     */
    data: XStitchClothCreateManyInput | XStitchClothCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * XStitchCloth update
   */
  export type XStitchClothUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XStitchCloth
     */
    select?: XStitchClothSelect<ExtArgs> | null
    /**
     * Omit specific fields from the XStitchCloth
     */
    omit?: XStitchClothOmit<ExtArgs> | null
    /**
     * The data needed to update a XStitchCloth.
     */
    data: XOR<XStitchClothUpdateInput, XStitchClothUncheckedUpdateInput>
    /**
     * Choose, which XStitchCloth to update.
     */
    where: XStitchClothWhereUniqueInput
  }

  /**
   * XStitchCloth updateMany
   */
  export type XStitchClothUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update XStitchCloths.
     */
    data: XOR<XStitchClothUpdateManyMutationInput, XStitchClothUncheckedUpdateManyInput>
    /**
     * Filter which XStitchCloths to update
     */
    where?: XStitchClothWhereInput
    /**
     * Limit how many XStitchCloths to update.
     */
    limit?: number
  }

  /**
   * XStitchCloth updateManyAndReturn
   */
  export type XStitchClothUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XStitchCloth
     */
    select?: XStitchClothSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the XStitchCloth
     */
    omit?: XStitchClothOmit<ExtArgs> | null
    /**
     * The data used to update XStitchCloths.
     */
    data: XOR<XStitchClothUpdateManyMutationInput, XStitchClothUncheckedUpdateManyInput>
    /**
     * Filter which XStitchCloths to update
     */
    where?: XStitchClothWhereInput
    /**
     * Limit how many XStitchCloths to update.
     */
    limit?: number
  }

  /**
   * XStitchCloth upsert
   */
  export type XStitchClothUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XStitchCloth
     */
    select?: XStitchClothSelect<ExtArgs> | null
    /**
     * Omit specific fields from the XStitchCloth
     */
    omit?: XStitchClothOmit<ExtArgs> | null
    /**
     * The filter to search for the XStitchCloth to update in case it exists.
     */
    where: XStitchClothWhereUniqueInput
    /**
     * In case the XStitchCloth found by the `where` argument doesn't exist, create a new XStitchCloth with this data.
     */
    create: XOR<XStitchClothCreateInput, XStitchClothUncheckedCreateInput>
    /**
     * In case the XStitchCloth was found with the provided `where` argument, update it with this data.
     */
    update: XOR<XStitchClothUpdateInput, XStitchClothUncheckedUpdateInput>
  }

  /**
   * XStitchCloth delete
   */
  export type XStitchClothDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XStitchCloth
     */
    select?: XStitchClothSelect<ExtArgs> | null
    /**
     * Omit specific fields from the XStitchCloth
     */
    omit?: XStitchClothOmit<ExtArgs> | null
    /**
     * Filter which XStitchCloth to delete.
     */
    where: XStitchClothWhereUniqueInput
  }

  /**
   * XStitchCloth deleteMany
   */
  export type XStitchClothDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which XStitchCloths to delete
     */
    where?: XStitchClothWhereInput
    /**
     * Limit how many XStitchCloths to delete.
     */
    limit?: number
  }

  /**
   * XStitchCloth without action
   */
  export type XStitchClothDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XStitchCloth
     */
    select?: XStitchClothSelect<ExtArgs> | null
    /**
     * Omit specific fields from the XStitchCloth
     */
    omit?: XStitchClothOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ThreadScalarFieldEnum: {
    id: 'id',
    brand: 'brand',
    colorNumber: 'colorNumber',
    colorName: 'colorName',
    quantity: 'quantity',
    status: 'status',
    wishlist: 'wishlist'
  };

  export type ThreadScalarFieldEnum = (typeof ThreadScalarFieldEnum)[keyof typeof ThreadScalarFieldEnum]


  export const BeadScalarFieldEnum: {
    id: 'id',
    brand: 'brand',
    itemCode: 'itemCode',
    size: 'size',
    colorName: 'colorName',
    quantity: 'quantity',
    status: 'status',
    wishlist: 'wishlist'
  };

  export type BeadScalarFieldEnum = (typeof BeadScalarFieldEnum)[keyof typeof BeadScalarFieldEnum]


  export const CutClothScalarFieldEnum: {
    id: 'id',
    fabricType: 'fabricType',
    pattern: 'pattern',
    size: 'size',
    quantity: 'quantity',
    status: 'status',
    wishlist: 'wishlist'
  };

  export type CutClothScalarFieldEnum = (typeof CutClothScalarFieldEnum)[keyof typeof CutClothScalarFieldEnum]


  export const XStitchClothScalarFieldEnum: {
    id: 'id',
    count: 'count',
    color: 'color',
    size: 'size',
    quantity: 'quantity',
    status: 'status',
    wishlist: 'wishlist'
  };

  export type XStitchClothScalarFieldEnum = (typeof XStitchClothScalarFieldEnum)[keyof typeof XStitchClothScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ThreadWhereInput = {
    AND?: ThreadWhereInput | ThreadWhereInput[]
    OR?: ThreadWhereInput[]
    NOT?: ThreadWhereInput | ThreadWhereInput[]
    id?: IntFilter<"Thread"> | number
    brand?: StringFilter<"Thread"> | string
    colorNumber?: StringFilter<"Thread"> | string
    colorName?: StringNullableFilter<"Thread"> | string | null
    quantity?: IntFilter<"Thread"> | number
    status?: StringNullableFilter<"Thread"> | string | null
    wishlist?: BoolFilter<"Thread"> | boolean
  }

  export type ThreadOrderByWithRelationInput = {
    id?: SortOrder
    brand?: SortOrder
    colorNumber?: SortOrder
    colorName?: SortOrderInput | SortOrder
    quantity?: SortOrder
    status?: SortOrderInput | SortOrder
    wishlist?: SortOrder
  }

  export type ThreadWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ThreadWhereInput | ThreadWhereInput[]
    OR?: ThreadWhereInput[]
    NOT?: ThreadWhereInput | ThreadWhereInput[]
    brand?: StringFilter<"Thread"> | string
    colorNumber?: StringFilter<"Thread"> | string
    colorName?: StringNullableFilter<"Thread"> | string | null
    quantity?: IntFilter<"Thread"> | number
    status?: StringNullableFilter<"Thread"> | string | null
    wishlist?: BoolFilter<"Thread"> | boolean
  }, "id">

  export type ThreadOrderByWithAggregationInput = {
    id?: SortOrder
    brand?: SortOrder
    colorNumber?: SortOrder
    colorName?: SortOrderInput | SortOrder
    quantity?: SortOrder
    status?: SortOrderInput | SortOrder
    wishlist?: SortOrder
    _count?: ThreadCountOrderByAggregateInput
    _avg?: ThreadAvgOrderByAggregateInput
    _max?: ThreadMaxOrderByAggregateInput
    _min?: ThreadMinOrderByAggregateInput
    _sum?: ThreadSumOrderByAggregateInput
  }

  export type ThreadScalarWhereWithAggregatesInput = {
    AND?: ThreadScalarWhereWithAggregatesInput | ThreadScalarWhereWithAggregatesInput[]
    OR?: ThreadScalarWhereWithAggregatesInput[]
    NOT?: ThreadScalarWhereWithAggregatesInput | ThreadScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Thread"> | number
    brand?: StringWithAggregatesFilter<"Thread"> | string
    colorNumber?: StringWithAggregatesFilter<"Thread"> | string
    colorName?: StringNullableWithAggregatesFilter<"Thread"> | string | null
    quantity?: IntWithAggregatesFilter<"Thread"> | number
    status?: StringNullableWithAggregatesFilter<"Thread"> | string | null
    wishlist?: BoolWithAggregatesFilter<"Thread"> | boolean
  }

  export type BeadWhereInput = {
    AND?: BeadWhereInput | BeadWhereInput[]
    OR?: BeadWhereInput[]
    NOT?: BeadWhereInput | BeadWhereInput[]
    id?: IntFilter<"Bead"> | number
    brand?: StringFilter<"Bead"> | string
    itemCode?: StringFilter<"Bead"> | string
    size?: StringFilter<"Bead"> | string
    colorName?: StringNullableFilter<"Bead"> | string | null
    quantity?: IntFilter<"Bead"> | number
    status?: StringNullableFilter<"Bead"> | string | null
    wishlist?: BoolFilter<"Bead"> | boolean
  }

  export type BeadOrderByWithRelationInput = {
    id?: SortOrder
    brand?: SortOrder
    itemCode?: SortOrder
    size?: SortOrder
    colorName?: SortOrderInput | SortOrder
    quantity?: SortOrder
    status?: SortOrderInput | SortOrder
    wishlist?: SortOrder
  }

  export type BeadWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BeadWhereInput | BeadWhereInput[]
    OR?: BeadWhereInput[]
    NOT?: BeadWhereInput | BeadWhereInput[]
    brand?: StringFilter<"Bead"> | string
    itemCode?: StringFilter<"Bead"> | string
    size?: StringFilter<"Bead"> | string
    colorName?: StringNullableFilter<"Bead"> | string | null
    quantity?: IntFilter<"Bead"> | number
    status?: StringNullableFilter<"Bead"> | string | null
    wishlist?: BoolFilter<"Bead"> | boolean
  }, "id">

  export type BeadOrderByWithAggregationInput = {
    id?: SortOrder
    brand?: SortOrder
    itemCode?: SortOrder
    size?: SortOrder
    colorName?: SortOrderInput | SortOrder
    quantity?: SortOrder
    status?: SortOrderInput | SortOrder
    wishlist?: SortOrder
    _count?: BeadCountOrderByAggregateInput
    _avg?: BeadAvgOrderByAggregateInput
    _max?: BeadMaxOrderByAggregateInput
    _min?: BeadMinOrderByAggregateInput
    _sum?: BeadSumOrderByAggregateInput
  }

  export type BeadScalarWhereWithAggregatesInput = {
    AND?: BeadScalarWhereWithAggregatesInput | BeadScalarWhereWithAggregatesInput[]
    OR?: BeadScalarWhereWithAggregatesInput[]
    NOT?: BeadScalarWhereWithAggregatesInput | BeadScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Bead"> | number
    brand?: StringWithAggregatesFilter<"Bead"> | string
    itemCode?: StringWithAggregatesFilter<"Bead"> | string
    size?: StringWithAggregatesFilter<"Bead"> | string
    colorName?: StringNullableWithAggregatesFilter<"Bead"> | string | null
    quantity?: IntWithAggregatesFilter<"Bead"> | number
    status?: StringNullableWithAggregatesFilter<"Bead"> | string | null
    wishlist?: BoolWithAggregatesFilter<"Bead"> | boolean
  }

  export type CutClothWhereInput = {
    AND?: CutClothWhereInput | CutClothWhereInput[]
    OR?: CutClothWhereInput[]
    NOT?: CutClothWhereInput | CutClothWhereInput[]
    id?: IntFilter<"CutCloth"> | number
    fabricType?: StringFilter<"CutCloth"> | string
    pattern?: StringFilter<"CutCloth"> | string
    size?: StringFilter<"CutCloth"> | string
    quantity?: IntFilter<"CutCloth"> | number
    status?: StringNullableFilter<"CutCloth"> | string | null
    wishlist?: BoolFilter<"CutCloth"> | boolean
  }

  export type CutClothOrderByWithRelationInput = {
    id?: SortOrder
    fabricType?: SortOrder
    pattern?: SortOrder
    size?: SortOrder
    quantity?: SortOrder
    status?: SortOrderInput | SortOrder
    wishlist?: SortOrder
  }

  export type CutClothWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CutClothWhereInput | CutClothWhereInput[]
    OR?: CutClothWhereInput[]
    NOT?: CutClothWhereInput | CutClothWhereInput[]
    fabricType?: StringFilter<"CutCloth"> | string
    pattern?: StringFilter<"CutCloth"> | string
    size?: StringFilter<"CutCloth"> | string
    quantity?: IntFilter<"CutCloth"> | number
    status?: StringNullableFilter<"CutCloth"> | string | null
    wishlist?: BoolFilter<"CutCloth"> | boolean
  }, "id">

  export type CutClothOrderByWithAggregationInput = {
    id?: SortOrder
    fabricType?: SortOrder
    pattern?: SortOrder
    size?: SortOrder
    quantity?: SortOrder
    status?: SortOrderInput | SortOrder
    wishlist?: SortOrder
    _count?: CutClothCountOrderByAggregateInput
    _avg?: CutClothAvgOrderByAggregateInput
    _max?: CutClothMaxOrderByAggregateInput
    _min?: CutClothMinOrderByAggregateInput
    _sum?: CutClothSumOrderByAggregateInput
  }

  export type CutClothScalarWhereWithAggregatesInput = {
    AND?: CutClothScalarWhereWithAggregatesInput | CutClothScalarWhereWithAggregatesInput[]
    OR?: CutClothScalarWhereWithAggregatesInput[]
    NOT?: CutClothScalarWhereWithAggregatesInput | CutClothScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CutCloth"> | number
    fabricType?: StringWithAggregatesFilter<"CutCloth"> | string
    pattern?: StringWithAggregatesFilter<"CutCloth"> | string
    size?: StringWithAggregatesFilter<"CutCloth"> | string
    quantity?: IntWithAggregatesFilter<"CutCloth"> | number
    status?: StringNullableWithAggregatesFilter<"CutCloth"> | string | null
    wishlist?: BoolWithAggregatesFilter<"CutCloth"> | boolean
  }

  export type XStitchClothWhereInput = {
    AND?: XStitchClothWhereInput | XStitchClothWhereInput[]
    OR?: XStitchClothWhereInput[]
    NOT?: XStitchClothWhereInput | XStitchClothWhereInput[]
    id?: IntFilter<"XStitchCloth"> | number
    count?: StringFilter<"XStitchCloth"> | string
    color?: StringFilter<"XStitchCloth"> | string
    size?: StringFilter<"XStitchCloth"> | string
    quantity?: IntFilter<"XStitchCloth"> | number
    status?: StringNullableFilter<"XStitchCloth"> | string | null
    wishlist?: BoolFilter<"XStitchCloth"> | boolean
  }

  export type XStitchClothOrderByWithRelationInput = {
    id?: SortOrder
    count?: SortOrder
    color?: SortOrder
    size?: SortOrder
    quantity?: SortOrder
    status?: SortOrderInput | SortOrder
    wishlist?: SortOrder
  }

  export type XStitchClothWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: XStitchClothWhereInput | XStitchClothWhereInput[]
    OR?: XStitchClothWhereInput[]
    NOT?: XStitchClothWhereInput | XStitchClothWhereInput[]
    count?: StringFilter<"XStitchCloth"> | string
    color?: StringFilter<"XStitchCloth"> | string
    size?: StringFilter<"XStitchCloth"> | string
    quantity?: IntFilter<"XStitchCloth"> | number
    status?: StringNullableFilter<"XStitchCloth"> | string | null
    wishlist?: BoolFilter<"XStitchCloth"> | boolean
  }, "id">

  export type XStitchClothOrderByWithAggregationInput = {
    id?: SortOrder
    count?: SortOrder
    color?: SortOrder
    size?: SortOrder
    quantity?: SortOrder
    status?: SortOrderInput | SortOrder
    wishlist?: SortOrder
    _count?: XStitchClothCountOrderByAggregateInput
    _avg?: XStitchClothAvgOrderByAggregateInput
    _max?: XStitchClothMaxOrderByAggregateInput
    _min?: XStitchClothMinOrderByAggregateInput
    _sum?: XStitchClothSumOrderByAggregateInput
  }

  export type XStitchClothScalarWhereWithAggregatesInput = {
    AND?: XStitchClothScalarWhereWithAggregatesInput | XStitchClothScalarWhereWithAggregatesInput[]
    OR?: XStitchClothScalarWhereWithAggregatesInput[]
    NOT?: XStitchClothScalarWhereWithAggregatesInput | XStitchClothScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"XStitchCloth"> | number
    count?: StringWithAggregatesFilter<"XStitchCloth"> | string
    color?: StringWithAggregatesFilter<"XStitchCloth"> | string
    size?: StringWithAggregatesFilter<"XStitchCloth"> | string
    quantity?: IntWithAggregatesFilter<"XStitchCloth"> | number
    status?: StringNullableWithAggregatesFilter<"XStitchCloth"> | string | null
    wishlist?: BoolWithAggregatesFilter<"XStitchCloth"> | boolean
  }

  export type ThreadCreateInput = {
    brand: string
    colorNumber: string
    colorName?: string | null
    quantity: number
    status?: string | null
    wishlist: boolean
  }

  export type ThreadUncheckedCreateInput = {
    id?: number
    brand: string
    colorNumber: string
    colorName?: string | null
    quantity: number
    status?: string | null
    wishlist: boolean
  }

  export type ThreadUpdateInput = {
    brand?: StringFieldUpdateOperationsInput | string
    colorNumber?: StringFieldUpdateOperationsInput | string
    colorName?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    wishlist?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ThreadUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    brand?: StringFieldUpdateOperationsInput | string
    colorNumber?: StringFieldUpdateOperationsInput | string
    colorName?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    wishlist?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ThreadCreateManyInput = {
    id?: number
    brand: string
    colorNumber: string
    colorName?: string | null
    quantity: number
    status?: string | null
    wishlist: boolean
  }

  export type ThreadUpdateManyMutationInput = {
    brand?: StringFieldUpdateOperationsInput | string
    colorNumber?: StringFieldUpdateOperationsInput | string
    colorName?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    wishlist?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ThreadUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    brand?: StringFieldUpdateOperationsInput | string
    colorNumber?: StringFieldUpdateOperationsInput | string
    colorName?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    wishlist?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BeadCreateInput = {
    brand: string
    itemCode: string
    size: string
    colorName?: string | null
    quantity: number
    status?: string | null
    wishlist: boolean
  }

  export type BeadUncheckedCreateInput = {
    id?: number
    brand: string
    itemCode: string
    size: string
    colorName?: string | null
    quantity: number
    status?: string | null
    wishlist: boolean
  }

  export type BeadUpdateInput = {
    brand?: StringFieldUpdateOperationsInput | string
    itemCode?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    colorName?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    wishlist?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BeadUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    brand?: StringFieldUpdateOperationsInput | string
    itemCode?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    colorName?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    wishlist?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BeadCreateManyInput = {
    id?: number
    brand: string
    itemCode: string
    size: string
    colorName?: string | null
    quantity: number
    status?: string | null
    wishlist: boolean
  }

  export type BeadUpdateManyMutationInput = {
    brand?: StringFieldUpdateOperationsInput | string
    itemCode?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    colorName?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    wishlist?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BeadUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    brand?: StringFieldUpdateOperationsInput | string
    itemCode?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    colorName?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    wishlist?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CutClothCreateInput = {
    fabricType: string
    pattern: string
    size: string
    quantity: number
    status?: string | null
    wishlist: boolean
  }

  export type CutClothUncheckedCreateInput = {
    id?: number
    fabricType: string
    pattern: string
    size: string
    quantity: number
    status?: string | null
    wishlist: boolean
  }

  export type CutClothUpdateInput = {
    fabricType?: StringFieldUpdateOperationsInput | string
    pattern?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    wishlist?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CutClothUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    fabricType?: StringFieldUpdateOperationsInput | string
    pattern?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    wishlist?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CutClothCreateManyInput = {
    id?: number
    fabricType: string
    pattern: string
    size: string
    quantity: number
    status?: string | null
    wishlist: boolean
  }

  export type CutClothUpdateManyMutationInput = {
    fabricType?: StringFieldUpdateOperationsInput | string
    pattern?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    wishlist?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CutClothUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    fabricType?: StringFieldUpdateOperationsInput | string
    pattern?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    wishlist?: BoolFieldUpdateOperationsInput | boolean
  }

  export type XStitchClothCreateInput = {
    count: string
    color: string
    size: string
    quantity: number
    status?: string | null
    wishlist: boolean
  }

  export type XStitchClothUncheckedCreateInput = {
    id?: number
    count: string
    color: string
    size: string
    quantity: number
    status?: string | null
    wishlist: boolean
  }

  export type XStitchClothUpdateInput = {
    count?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    wishlist?: BoolFieldUpdateOperationsInput | boolean
  }

  export type XStitchClothUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    count?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    wishlist?: BoolFieldUpdateOperationsInput | boolean
  }

  export type XStitchClothCreateManyInput = {
    id?: number
    count: string
    color: string
    size: string
    quantity: number
    status?: string | null
    wishlist: boolean
  }

  export type XStitchClothUpdateManyMutationInput = {
    count?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    wishlist?: BoolFieldUpdateOperationsInput | boolean
  }

  export type XStitchClothUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    count?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    wishlist?: BoolFieldUpdateOperationsInput | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ThreadCountOrderByAggregateInput = {
    id?: SortOrder
    brand?: SortOrder
    colorNumber?: SortOrder
    colorName?: SortOrder
    quantity?: SortOrder
    status?: SortOrder
    wishlist?: SortOrder
  }

  export type ThreadAvgOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
  }

  export type ThreadMaxOrderByAggregateInput = {
    id?: SortOrder
    brand?: SortOrder
    colorNumber?: SortOrder
    colorName?: SortOrder
    quantity?: SortOrder
    status?: SortOrder
    wishlist?: SortOrder
  }

  export type ThreadMinOrderByAggregateInput = {
    id?: SortOrder
    brand?: SortOrder
    colorNumber?: SortOrder
    colorName?: SortOrder
    quantity?: SortOrder
    status?: SortOrder
    wishlist?: SortOrder
  }

  export type ThreadSumOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type BeadCountOrderByAggregateInput = {
    id?: SortOrder
    brand?: SortOrder
    itemCode?: SortOrder
    size?: SortOrder
    colorName?: SortOrder
    quantity?: SortOrder
    status?: SortOrder
    wishlist?: SortOrder
  }

  export type BeadAvgOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
  }

  export type BeadMaxOrderByAggregateInput = {
    id?: SortOrder
    brand?: SortOrder
    itemCode?: SortOrder
    size?: SortOrder
    colorName?: SortOrder
    quantity?: SortOrder
    status?: SortOrder
    wishlist?: SortOrder
  }

  export type BeadMinOrderByAggregateInput = {
    id?: SortOrder
    brand?: SortOrder
    itemCode?: SortOrder
    size?: SortOrder
    colorName?: SortOrder
    quantity?: SortOrder
    status?: SortOrder
    wishlist?: SortOrder
  }

  export type BeadSumOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
  }

  export type CutClothCountOrderByAggregateInput = {
    id?: SortOrder
    fabricType?: SortOrder
    pattern?: SortOrder
    size?: SortOrder
    quantity?: SortOrder
    status?: SortOrder
    wishlist?: SortOrder
  }

  export type CutClothAvgOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
  }

  export type CutClothMaxOrderByAggregateInput = {
    id?: SortOrder
    fabricType?: SortOrder
    pattern?: SortOrder
    size?: SortOrder
    quantity?: SortOrder
    status?: SortOrder
    wishlist?: SortOrder
  }

  export type CutClothMinOrderByAggregateInput = {
    id?: SortOrder
    fabricType?: SortOrder
    pattern?: SortOrder
    size?: SortOrder
    quantity?: SortOrder
    status?: SortOrder
    wishlist?: SortOrder
  }

  export type CutClothSumOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
  }

  export type XStitchClothCountOrderByAggregateInput = {
    id?: SortOrder
    count?: SortOrder
    color?: SortOrder
    size?: SortOrder
    quantity?: SortOrder
    status?: SortOrder
    wishlist?: SortOrder
  }

  export type XStitchClothAvgOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
  }

  export type XStitchClothMaxOrderByAggregateInput = {
    id?: SortOrder
    count?: SortOrder
    color?: SortOrder
    size?: SortOrder
    quantity?: SortOrder
    status?: SortOrder
    wishlist?: SortOrder
  }

  export type XStitchClothMinOrderByAggregateInput = {
    id?: SortOrder
    count?: SortOrder
    color?: SortOrder
    size?: SortOrder
    quantity?: SortOrder
    status?: SortOrder
    wishlist?: SortOrder
  }

  export type XStitchClothSumOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}