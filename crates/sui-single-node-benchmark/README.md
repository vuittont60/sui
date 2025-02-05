# Sui Single Node Benchmark

This crate contains a binary for performance benchmarking a single Sui node.
Upon running the binary, the node will instantiate a standalone `AuthorityState`, and submit
executable transactions to it in parallel. We then measure the time it takes for it to finish
executing all the transactions.

## Usage
There are two modes to benchmark: `move` and `no-move`. `move` mode benchmarks the performance
of executing Move transactions, while `no-move` mode benchmarks the performance of executing
non-Move transactions.

To run the benchmark, you can simply run the following command:
```
cargo run --release --bin sui-single-node-benchmark -- move
```
or
```
cargo run --release --bin sui-single-node-benchmark -- no-move

```
By default, it generates 50,0000 transactions, which can be changed using --tx-count.

### Move benchmark workloads
When running the Move benchmark, one can adjust the workload to stress test different parts
of the execution engine:
- `--num-input-objects`: this specifies number of address owned input objects read/mutated by each transaction. Default to 2.
- `--num-dynamic-fields`: this specifies number of dynamic fields read by each transaction. Default to 0.
- `--computation`: this specifies computation intensity. An increase by 1 means 100 more loop iterations in Fibonacci computation. Default to 0.

### Components
By default, the benchmark will use the `AuthorityState::try_execute_immediately` entry function,
which includes the execution layer as well as the interaction with the DB. This is equivalent to running:
```
cargo run --release --bin sui-single-node-benchmark -- --component baseline <move/no-move>
```
The benchmark supports various component:
- `baseline`: this is the default component, which includes the execution layer as well as the interaction with the DB.
- `with-tx-manager`: on top of baseline, it schedules transactions into the transaction manager, instead of executing them immediately. It also goes through the execution driver.
- `validator-without-consensus`: in this mode, transactions are sent to the `handle_certificate` GRPC entry point of the validator service. On top of `with-tx-manager`, it also includes the verification of the certificate.
- `validator-with-fake-consensus`: in this mode, on top of `validator-without-consensus`, it also submits the transactions to a simple consensus layer, which sequences transactions in the order as it receives it directly back to the store. It covers part of the cost in consensus handler. The commit size can be controlled with `--checkpoint-size`.
- `txn-signing`: in this mode, instead of executing transactions, we only benchmark transactions signing.
- `checkpoint-executor`: in this mode, we benchmark how long it takes for the checkpoint executor to execute all checkpoints (i.e. all transactions in them) for the entire epoch. We first construct transactions and effects by actually executing them, and revert them as if they were never executed, construct checkpoints using the results, and then start the checkpoint executor. The size of checkpoints can be controlled with `--checkpoint-size`.


### Profiling
If you are interested in profiling Sui, you can start the benchmark, wait for it to print out "Started execution...", and then attach a profiler to the process.
