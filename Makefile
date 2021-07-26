TAG?=12-buster-slim
IMAGE?=lgtm-action/node:${TAG}

image:
	@ docker build \
		. \
		-t ${IMAGE} \
		--build-arg TAG=${TAG} \
		--no-cache

npm:
	@ docker container run \
		--name dev \
		--init \
		--rm \
		-t \
		-v `pwd`:/app \
		${IMAGE} \
		$(filter-out $@,$(MAKECMDGOALS))

%:
	@: