<script>
	import { isAuthenticated, user, user_tasks, tasks } from '../../store';
	import TaskItem from '../../components/task-item.svelte';
	import auth from '../../auth-service.js';
	import { onMount } from 'svelte';

	let newTask;
	// let auth0Client;

	// onMount(async () => {
	// 	auth0Client = await auth.createClient();
	//
	// 	isAuthenticated.set(await auth0Client.isAuthenticated());
	// 	user.set(await auth0Client.getUser());
	// });

	function login() {
		auth.loginWithPopup();
	}

	function logout() {
		auth.logout();
	}

	function addItem() {
		let newTaskObject = {
			id: genRandom(),
			description: newTask,
			completed: false,
			user: $user.email
		};

		console.log(newTaskObject);

		let updatedTasks = [...$tasks, newTaskObject];

		tasks.set(updatedTasks);

		newTask = '';
	}

	function genRandom(length = 7) {
		var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var result = '';
		for (var i = length; i > 0; --i)
			result += chars[Math.round(Math.random() * (chars.length - 1))];
		return result;
	}
</script>

{#if !$isAuthenticated}
	<div class="container mt-5">
		<div class="row">
			<div class="col-md-10 offset-md-1">
				<div class="jumbotron">
					<h1 class="display-4">Task Management made Easy!</h1>
					<p class="lead">Instructions</p>
					<ul>
						<li>Login to start &#128272;</li>
						<li>Create Tasks &#128221;</li>
						<li>Tick off completed tasks &#9989;</li>
					</ul>
					<a
						class="btn btn-primary btn-lg mr-auto ml-auto"
						href="/tasks-list"
						role="button"
						on:click={login}>Log In</a
					>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="container" id="main-application">
		<div class="row">
			<div class="col-md-6">
				<ul class="list-group">
					{#each $user_tasks as item (item.id)}
						<TaskItem task={item} />
					{/each}
				</ul>
			</div>
			<div class="col-md-6">
				<input class="form-control" bind:value={newTask} placeholder="Enter New Task" />
				<br />
				<button type="button" class="btn btn-primary" on:click={addItem}> Add Task </button>
			</div>
		</div>
	</div>
{/if}
